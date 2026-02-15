"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const ProductCard = ({ product }) => {
    const { language, t } = useLanguage();

    // Select the correct field based on language
    const name = language === 'th' && product.name_th ? product.name_th : product.name;
    const description = language === 'th' && product.description_th ? product.description_th : product.description;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="aspect-square bg-surface-alt/50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-300">
                    {/* Placeholder for Product Image */}
                    <svg className="h-32 w-32 text-gray-300 group-hover:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                </div>
                {product.category && (
                    <div className="absolute top-3 right-3 rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm z-10">
                        {product.category}
                    </div>
                )}
                {/* Status Badges */}
                {product.status === 'preorder' && (
                    <div className="absolute top-3 left-3 rounded-full bg-blue-500/90 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm z-10">
                        Pre-order
                    </div>
                )}
                {(product.status === 'discontinued' || (product.variants && product.variants.length > 0 && product.variants.every(v => v.stock_status === 'out_of_stock'))) && (
                    <div className="absolute top-3 left-3 rounded-full bg-gray-500/90 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm z-10">
                        Sold Out
                    </div>
                )}
                {product.status === 'available' && !(product.variants && product.variants.every(v => v.stock_status === 'out_of_stock')) && (
                    <div className="absolute top-3 left-3 rounded-full bg-green-500/90 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm z-10">
                        Ready to Ship
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5 space-y-3">
                <div className="space-y-1">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                        <Link href={`/products/${product.id}`}>
                            <span className="absolute inset-0" aria-hidden="true" />
                            {name}
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Starting at</span>
                        <span className="font-bold text-lg text-primary">${product.price}</span>
                    </div>
                    <button className="z-10 rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white">
                        {t('products.viewDetails')}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ProductCard;
