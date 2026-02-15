"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { t, language } = useLanguage();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-background h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-bold text-foreground">{t('cart.title')}</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-gray-500 hover:text-foreground transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <svg className="w-16 h-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                            <p className="text-gray-500">{t('cart.empty')}</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-primary font-medium hover:underline"
                            >
                                {t('products.clearFilters') ? t('products.clearFilters').replace('Clear all filters', 'Continue Shopping') : 'Continue Shopping'}
                                {/* Fallback/Hack if strict translation key missing for "Continue Shopping", using generic or just hardcode if prefer */}
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => {
                            const name = language === 'th' && item.name_th ? item.name_th : item.name;
                            return (
                                <div key={item.id} className="flex gap-4 bg-surface-alt/30 p-3 rounded-lg border border-border">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-white flex items-center justify-center">
                                        {/* Placeholder Image */}
                                        <svg className="h-10 w-10 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                        </svg>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-foreground">
                                                <h3>
                                                    <Link href={`/products/${item.id}`} onClick={() => setIsCartOpen(false)}>
                                                        {name}
                                                    </Link>
                                                </h3>
                                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.quantity} x ${item.price}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 rounded-md hover:bg-gray-200"
                                                >
                                                    -
                                                </button>
                                                <span className="font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 rounded-md hover:bg-gray-200"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="font-medium text-primary hover:text-primary-dark"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t border-border p-4 space-y-4 bg-surface-alt/50">
                        <div className="flex justify-between text-base font-medium text-foreground">
                            <p>{t('cart.subtotal')}</p>
                            <p>${cartTotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">{t('cart.calculatedAtCheckout')}</p>
                        <div className="mt-6">
                            <Link
                                href="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-dark"
                            >
                                {t('cart.checkout')}
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                {/* or */}
                                <button
                                    type="button"
                                    className="font-medium text-primary hover:text-primary-dark ml-1"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
