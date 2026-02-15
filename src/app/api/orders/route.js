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

export async function GET(req) {
    try {
        const orders = readData();
        // Sort by newest first
        const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return NextResponse.json(sortedOrders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const orders = readData();

        const newOrder = {
            id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            createdAt: new Date().toISOString(),
            status: 'pending', // pending, paid, shipped, cancelled
            ...body
        };

        orders.push(newOrder);
        writeData(orders);

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
