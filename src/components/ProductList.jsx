"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

const categories = ["All", "Injury Repair", "Cognitive", "Muscle Growth", "Anti-Aging"];

export default function ProductList({ initialProducts }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t, language } = useLanguage();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const selectedCategory = searchParams.get('category') || 'All';
    const products = initialProducts || [];

    const filteredProducts = products.filter((product) => {
        // Search in both languages
        const matchesSearch = product.name.toLowerCase().includes(query) ||
            (product.name_th && product.name_th.toLowerCase().includes(query)) ||
            product.description.toLowerCase().includes(query) ||
            (product.description_th && product.description_th.toLowerCase().includes(query)) ||
            product.category.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleCategoryChange = (category) => {
        const params = new URLSearchParams(searchParams);
        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedCategory === cat
                            ? 'bg-primary text-white border-primary'
                            : 'bg-background text-foreground border-gray-300 hover:border-primary hover:text-primary'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Results Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-lg font-medium text-gray-900">{t('products.noResults')}</h3>
                    <p className="mt-1 text-gray-500">{t('products.tryAdjusting')}</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="mt-4 text-primary hover:underline"
                    >
                        {t('products.clearFilters')}
                    </button>
                </div>
            )}
        </div>
    );
}
