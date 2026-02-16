const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@goldentier.com';
    const password = 'AdminPass123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'admin'
        },
        create: {
            email,
            name: 'Golden Tier Admin',
            password: hashedPassword,
            role: 'admin',
            points: 9999
        },
    });

    console.log(`Admin user ready: ${user.email}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
