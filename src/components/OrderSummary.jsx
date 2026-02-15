"use client";

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function OrderSummary() {
    const { cart, cartTotal } = useCart();
    const { t, language } = useLanguage();
    const shipping = 0; // Free shipping for now
    const total = cartTotal + shipping;

    return (
        <div className="rounded-lg border border-border bg-surface-alt/30 p-6 shadow-sm">
            <h2 className="text-lg font-medium text-foreground mb-4">{t('cart.title')}</h2>

            <div className="flow-root">
                <ul className="-my-4 divide-y divide-border">
                    {cart.map((item) => {
                        const name = language === 'th' && item.name_th ? item.name_th : item.name;
                        return (
                            <li key={item.id} className="flex items-center py-4 space-x-4">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border bg-white flex items-center justify-center">
                                    <svg className="h-8 w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-foreground truncate">
                                        {name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{item.quantity} x ${item.price}</p>
                                </div>
                                <div className="text-sm font-medium text-foreground">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="border-t border-border mt-6 pt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500">{t('cart.subtotal')}</p>
                    <p className="font-medium text-foreground">${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500">{t('cart.shipping')}</p>
                    <p className="font-medium text-success">Free</p>
                </div>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                    <p className="text-base font-bold text-foreground">{t('cart.total')}</p>
                    <p className="text-xl font-bold text-primary">${total.toFixed(2)}</p>
                </div>
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center">
                By placing this order, you agree to our <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </div>
        </div>
    );
}
