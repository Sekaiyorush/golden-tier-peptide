"use client";

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function ProductActions({ product, selectedVariant }) {
    const { addToCart, setIsCartOpen } = useCart();
    const { t } = useLanguage();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        // Construct the item to add
        const itemToAdd = selectedVariant ? {
            id: selectedVariant.id, // Use unique variant ID
            name: `${product.name} (${selectedVariant.name})`,
            name_th: product.name_th ? `${product.name_th} (${selectedVariant.name})` : `${product.name} (${selectedVariant.name})`,
            price: selectedVariant.price,
            image: product.image,
            quantity: 1
        } : {
            id: product.id,
            name: product.name,
            name_th: product.name_th,
            price: product.price,
            image: product.image,
            quantity: 1
        };

        addToCart(itemToAdd);
        setIsAdded(true);
        setIsCartOpen(true);

        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 flex items-center justify-center h-12 rounded-md font-semibold text-white shadow-md transition-all duration-300 active:scale-95 ${isAdded
                        ? 'bg-green-600 hover:bg-green-700 cursor-default transform scale-100'
                        : 'bg-primary hover:bg-primary-dark'
                    }`}
            >
                {isAdded ? (
                    <span className="flex items-center animate-in fade-in zoom-in duration-300">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {t('productDetails.added') || 'Added'}
                    </span>
                ) : (
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        {t('productDetails.addToCart') || 'Add to Cart'}
                    </span>
                )}
            </button>
            <button className="flex-1 bg-transparent border border-input text-foreground h-12 rounded-md font-medium hover:bg-surface-alt transition-colors">
                Download COA
            </button>
        </div>
    );
}
