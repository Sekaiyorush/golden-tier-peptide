"use client";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import Link from 'next/link';

export default function OrderHistoryPage() {
    const { data: session } = useSession();
    const { t } = useLanguage();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (session) {
                try {
                    const res = await fetch('/api/orders');
                    if (res.ok) {
                        const data = await res.json();
                        setOrders(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchOrders();
    }, [session]);

    if (isLoading) {
        return <div className="p-4 text-center">{t('checkout.processing')}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">{t('account.noRecentActivity')}</h3>
                <div className="mt-6">
                    <Link href="/products" className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark">
                        {t('hero.cta')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    {t('account.orders')}
                </h3>
            </div>

            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {orders.map((order) => (
                        <li key={order.id}>
                            <Link href={`/account/orders/${order.id}`} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-primary">
                                            #{order.id}
                                        </p>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>
                                                Total: ${order.total.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
