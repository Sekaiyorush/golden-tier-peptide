import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/auth-utils';

// Helper to parse JSON fields
const parseProduct = (product) => {
    try {
        const specs = product.specs ? JSON.parse(product.specs) : {};
        return {
            ...product,
            benefits: product.benefits ? JSON.parse(product.benefits) : [],
            benefits_th: product.benefits_th ? JSON.parse(product.benefits_th) : [],
            variants: product.variants ? JSON.parse(product.variants) : [],
            specs,
            ...specs // Spread specs to top level for legacy/frontend compatibility (e.g. product.purity)
        };
    } catch (e) {
        console.error("Error parsing product JSON fields", e);
        return product;
    }
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (id) {
            const product = await prisma.product.findUnique({
                where: { id }
            });
            if (!product) {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 });
            }
            return NextResponse.json(parseProduct(product));
        }

        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Parse JSON fields for all products
        const parsedProducts = products.map(parseProduct);

        return NextResponse.json(parsedProducts);
    } catch (error) {
        console.error("Product GET Error:", error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

const SPEC_FIELDS = ['purity', 'form', 'quantity', 'sequence', 'cas_number', 'molar_mass'];

export async function POST(req) {
    try {
        const session = await getAuthSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        // Extract known non-schema fields to specs
        const specs = body.specs || {};
        SPEC_FIELDS.forEach(field => {
            if (body[field] !== undefined) {
                specs[field] = body[field];
                delete body[field];
            }
        });

        // Extract JSON fields and stringify
        const { benefits, benefits_th, variants, specs: _ignored, ...rest } = body;

        const newProduct = await prisma.product.create({
            data: {
                ...rest,
                benefits: JSON.stringify(benefits || []),
                benefits_th: JSON.stringify(benefits_th || []),
                variants: JSON.stringify(variants || []),
                specs: JSON.stringify(specs),
                stock: parseInt(rest.stock || 0),
                price: parseFloat(rest.price) // Ensure float
            }
        });

        return NextResponse.json(parseProduct(newProduct), { status: 201 });
    } catch (error) {
        console.error("Product POST Error:", error);
        return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const session = await getAuthSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        // Extract known non-schema fields to specs
        const specs = body.specs || {};
        SPEC_FIELDS.forEach(field => {
            if (body[field] !== undefined) {
                specs[field] = body[field];
                delete body[field];
            }
        });

        const { benefits, benefits_th, variants, specs: _ignored, id: _id, ...rest } = body;

        // Clean up system fields from rest if they exist
        delete rest.createdAt;
        delete rest.updatedAt;

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                ...rest,
                benefits: JSON.stringify(benefits || []),
                benefits_th: JSON.stringify(benefits_th || []),
                variants: JSON.stringify(variants || []),
                specs: JSON.stringify(specs),
                stock: parseInt(rest.stock || 0),
                price: parseFloat(rest.price)
            }
        });

        return NextResponse.json(parseProduct(updatedProduct));
    } catch (error) {
        console.error("Product PUT Error:", error);
        return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getAuthSession();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Product DELETE Error:", error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
