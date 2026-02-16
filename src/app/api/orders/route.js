import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth-utils';
import { encrypt, decrypt } from '@/lib/encryption';

export async function GET(req) {
    try {
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let orders;
        if (session.user.role === 'admin') {
            orders = await prisma.order.findMany({
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true, email: true } } }
            });
        } else {
            orders = await prisma.order.findMany({
                where: { userId: session.user.id },
                orderBy: { createdAt: 'desc' }
            });
        }

        // Decrypt shipping info for authorized viewer
        const decryptedOrders = orders.map(order => {
            try {
                return {
                    ...order,
                    shippingInfo: JSON.parse(decrypt(order.shippingInfo))
                };
            } catch (e) {
                return order;
            }
        });

        return NextResponse.json(decryptedOrders);
    } catch (error) {
        console.error("Orders GET Error:", error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const session = await getAuthSession();

        // Encrypt shipping info
        const encryptedShipping = encrypt(JSON.stringify(body.shippingInfo));

        const orderData = {
            status: 'pending',
            total: parseFloat(body.total),
            items: JSON.stringify(body.items),
            shippingInfo: encryptedShipping,
        };

        if (session && session.user && session.user.id) {
            orderData.userId = session.user.id;

            // Add points
            try {
                const pointsEarned = Math.floor(orderData.total / 10);
                await prisma.user.update({
                    where: { id: session.user.id },
                    data: { points: { increment: pointsEarned } }
                });
            } catch (err) {
                console.error("Failed to update points", err);
            }
        }

        const newOrder = await prisma.order.create({
            data: orderData
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error("Orders POST Error:", error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
