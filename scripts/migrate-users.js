const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const usersFile = path.join(__dirname, '../src/data/users.json');

async function main() {
    if (!fs.existsSync(usersFile)) {
        console.log('No users.json found, skipping migration.');
        return;
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    console.log(`Found ${users.length} users to migrate.`);

    for (const user of users) {
        // Check if user exists
        const existing = await prisma.user.findUnique({
            where: { email: user.email },
        });

        if (!existing) {
            console.log(`Migrating user: ${user.email}`);
            const hashedPassword = await bcrypt.hash(user.password, 10);

            await prisma.user.create({
                data: {
                    id: user.id || undefined, // Keep existing ID if possible, else generate new
                    email: user.email,
                    name: user.name,
                    role: user.role || 'customer',
                    password: hashedPassword,
                    points: user.points || 0,
                    // We can migrate orders later if needed, but for now just User
                },
            });
        } else {
            console.log(`User ${user.email} already exists.`);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
