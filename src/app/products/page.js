import ProductList from '@/components/ProductList';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata = {
    title: "Products | Golden Tier Peptide",
    description: "Browse our full catalog of premium research peptides. BPC-157, TB-500, CJC-1295, and more.",
};

async function getProducts() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Page Header */}
            <section className="bg-surface-alt border-b border-border py-12 md:py-16">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-primary-dark">
                            Research Catalog
                        </h1>
                        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Explore our comprehensive selection of high-purity peptides for your laboratory research needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12 md:py-24">
                <div className="container px-4 md:px-6">
                    <ProductList initialProducts={products} />
                </div>
            </section>
        </div>
    );
}
