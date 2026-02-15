import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/orders.json');

// Helper to read data
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    try {
        return JSON.parse(jsonData);
    } catch (error) {
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const orders = readData();
        const order = orders.find((o) => o.id === id);

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const orders = readData();
        const index = orders.findIndex((o) => o.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Update fields, preventing overwrite of immutable ones if needed
        orders[index] = { ...orders[index], ...body };
        writeData(orders);

        return NextResponse.json(orders[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
