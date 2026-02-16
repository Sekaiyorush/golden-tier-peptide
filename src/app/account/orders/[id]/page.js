"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { useParams, useRouter } from 'next/navigation';

export default function OrderDetailsPage() {
    const { data: session } = useSession();
    const { t, language } = useLanguage();
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session) {
            async function fetchOrder() {
                try {
                    // In a real app, this endpoint would return the single order
                    // utilizing the logic we built in api/orders/route.js (which currently returns all orders)
                    // We need to implement GET /api/orders/[id] or filter client side for now.
                    // Given the current GET /api/orders implementation returns ALL orders for the user, 
                    // we can filter here for simplicity until we optimize the API.

                    const res = await fetch('/api/orders');
                    if (res.ok) {
                        const orders = await res.json();
                        const foundOrder = orders.find(o => o.id === params.id);
                        if (foundOrder) {
                            setOrder(foundOrder);
                        } else {
                            router.push('/account/orders');
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch order details:", error);
                } finally {
                    setIsLoading(false);
                }
            }
            fetchOrder();
        }
    }, [session, params.id, router]);

    if (isLoading) {
        return <div className="p-4 text-center">{t('checkout.processing')}</div>;
    }

    if (!order) {
        return null; // Redirecting...
    }

    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
    // Shipping info is already decrypted by the API GET /api/orders for the user
    // But wait, the API returns decryptedOrders. map... check api/orders/route.js
    const shipping = order.shippingInfo;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    Order #{order.id}
                </h3>
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <h4 className="text-sm font-medium text-gray-500">{t('checkout.shippingAddress')}</h4>
                    <div className="mt-2 text-sm text-gray-900">
                        <p>{shipping?.firstName} {shipping?.lastName}</p>
                        <p>{shipping?.address}</p>
                        <p>{shipping?.city}, {shipping?.state} {shipping?.zip}</p>
                        <p className="mt-1 font-medium">{shipping?.phone}</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Order Information</h4>
                    <div className="mt-2 text-sm text-gray-900">
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                        <p>Total: ${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900">Items</h4>
                <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                    {items.map((item, index) => (
                        <li key={index} className="flex py-6">
                            <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{language === 'th' && item.name_th ? item.name_th : item.name}</h3>
                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.variant}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {item.quantity}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => router.back()}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                    {t('checkout.back')}
                </button>
            </div>
        </div>
    );
}
