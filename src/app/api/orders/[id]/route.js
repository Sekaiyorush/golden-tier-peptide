import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth-utils';
import { decrypt } from '@/lib/encryption';

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const session = await getAuthSession();
        if (!session || session.user.role !== 'admin') {
            // Check if it's the user's own order
            const orderCheck = await prisma.order.findUnique({
                where: { id },
                select: { userId: true }
            });
            if (!orderCheck || orderCheck.userId !== session?.user?.id) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: { user: { select: { name: true, email: true } } }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Decrypt shipping info & Parse items
        let shippingInfo = null;
        let items = [];
        try {
            shippingInfo = JSON.parse(decrypt(order.shippingInfo));
        } catch (e) {
            console.error("Decryption failed", e);
        }

        try {
            items = JSON.parse(order.items);
        } catch (e) {
            console.error("Items parsing failed", e);
        }

        return NextResponse.json({ ...order, shippingInfo, items });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const session = await getAuthSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { status } = body;

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
