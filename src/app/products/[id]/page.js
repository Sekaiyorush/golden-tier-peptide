"use client";

import { products } from '@/data/products';
import { notFound, useParams } from 'next/navigation';
import ProductActions from '@/components/ProductActions';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

export default function ProductPage() {
    const { id } = useParams();
    const { language, t } = useLanguage();
    // In a real app, this would likely be a fetch or context lookup to support dynamic updates immediately
    // For this POC with local data, we import. 
    // However, since we are now writing to a JSON file via API, we should ideally fetch here too 
    // or rely on the fact that `products.js` might not be updated in client-side navigation without a refresh.
    // Given the architecture, let's fetch from API to ensure we see latest edits.

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                    if (data.variants && data.variants.length > 0) {
                        setSelectedVariant(data.variants[0]);
                    }
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!product) return <div className="p-20 text-center">Product not found</div>;

    // Localized fields
    const name = language === 'th' && product.name_th ? product.name_th : product.name;
    const description = language === 'th' && product.description_th ? product.description_th : product.description;
    const benefits = language === 'th' && product.benefits_th && product.benefits_th.length > 0 ? product.benefits_th : product.benefits;
    const dosage = language === 'th' && product.dosage_th ? product.dosage_th : product.dosage;

    // Determine display price and quantity
    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentQuantity = selectedVariant && selectedVariant.quantity ? selectedVariant.quantity : (product.quantity || '5mg / vial');
    const isOutOfStock = selectedVariant ? selectedVariant.stock_status === 'out_of_stock' : product.status === 'discontinued';

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container px-4 py-10 md:px-6 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Product Image Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="aspect-square relative overflow-hidden rounded-xl bg-surface-alt border border-border flex items-center justify-center p-12">
                            {product.image && product.image.startsWith('http') ? (
                                <img src={product.image} alt={name} className="w-full h-full object-contain" />
                            ) : (
                                <svg className="h-48 w-48 text-primary/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                            )}
                            {(product.purity || product.specifications?.purity) && (
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm border border-border">
                                    {product.purity || product.specifications?.purity} Purity
                                </div>
                            )}
                            {product.status === 'preorder' && (
                                <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-blue-200">
                                    Pre-order
                                </div>
                            )}
                            {product.status === 'discontinued' && (
                                <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-gray-200">
                                    Discontinued
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">{name}</h1>
                            <div className="mt-2 flex items-center gap-3">
                                <span className={`text-3xl font-bold ${isOutOfStock ? 'text-gray-400' : 'text-primary'}`}>${currentPrice?.toFixed(2)}</span>
                                {isOutOfStock && <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded text-sm">Out of Stock</span>}
                                {selectedVariant?.stock_status === 'coming_soon' && <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded text-sm">Coming Soon</span>}
                            </div>
                        </div>

                        {/* Variant Selector */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-foreground">Select Option:</label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => {
                                        const isVariantOutOfStock = variant.stock_status === 'out_of_stock';
                                        return (
                                            <button
                                                key={variant.id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-4 py-2 rounded-md border text-sm font-medium transition-all relative
                                                    ${selectedVariant?.id === variant.id
                                                        ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                                                        : 'border-border text-gray-600 hover:border-gray-400'}
                                                    ${isVariantOutOfStock ? 'bg-gray-100 text-gray-400' : ''}
                                                `}
                                            >
                                                {variant.name}
                                                {variant.stock_status === 'coming_soon' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-500 whitespace-pre-wrap">
                            <p>{description}</p>
                        </div>

                        {/* Key Benefits */}
                        {benefits && benefits.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-foreground">{t('productDetails.benefits')}:</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 mr-2 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Dosage */}
                        {dosage && (
                            <div className="space-y-2">
                                <h3 className="font-semibold text-foreground">{t('productDetails.dosage')}:</h3>
                                <p className="text-sm text-gray-600">{dosage}</p>
                            </div>
                        )}

                        <div className="border-t border-border pt-6 space-y-4">
                            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                    <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                                        {product.warning || "Research use only. Not for human consumption."}
                                    </p>
                                </div>
                            </div>

                            {isOutOfStock ? (
                                <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-lg cursor-not-allowed">
                                    {selectedVariant?.stock_status === 'out_of_stock' ? 'Out of Stock' : (product.status === 'discontinued' ? 'Discontinued' : 'Unavailable')}
                                </button>
                            ) : (
                                <ProductActions product={product} selectedVariant={selectedVariant} />
                            )}
                        </div>

                        {/* Specifications Table */}
                        <div className="pt-6">
                            <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
                            <div className="overflow-hidden rounded-lg border border-border">
                                <table className="w-full text-sm">
                                    <tbody className="divide-y divide-border">
                                        <tr className="bg-surface-alt/50">
                                            <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 w-1/3">Sequence</td>
                                            <td className="px-4 py-3 text-foreground">{product.sequence || 'Protected Information'}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">CAS Number</td>
                                            <td className="px-4 py-3 text-foreground">{product.cas_number || 'N/A (Research Compound)'}</td>
                                        </tr>
                                        <tr className="bg-surface-alt/50">
                                            <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Molar Mass</td>
                                            <td className="px-4 py-3 text-foreground">{product.molar_mass || 'Variable'}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Purity</td>
                                            <td className="px-4 py-3 text-foreground">{product.purity || '≥99% (HPLC)'}</td>
                                        </tr>
                                        <tr className="bg-surface-alt/50">
                                            <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Form</td>
                                            <td className="px-4 py-3 text-foreground">{product.form || 'Lyophilized Powder'}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Quantity</td>
                                            <td className="px-4 py-3 text-foreground">{currentQuantity}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
