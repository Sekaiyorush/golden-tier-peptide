import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth-utils';

export async function GET(req) {
    try {
        const session = await getAuthSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                points: true,
                createdAt: true,
                _count: {
                    select: { orders: true }
                }
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Users GET Error:", error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}
