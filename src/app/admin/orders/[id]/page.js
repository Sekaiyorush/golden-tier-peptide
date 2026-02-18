"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailsPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const res = await fetch(`/api/orders/${id}`);
            if (res.ok) {
                const data = await res.json();
                setOrder(data);
            } else {
                router.push('/admin/orders');
            }
        } catch (error) {
            console.error('Failed to fetch order', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        setIsUpdating(true);
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                const updatedOrder = await res.json();
                // Merge with existing order to keep shippingInfo/items which might not be in response if not refetched fully
                // Or just refetch. But the PUT response usually returns the updated record.
                // If PUT returns just the prisma record, shippingInfo/items will be strings.
                // Safer to just re-fetch or manually update local state.
                setOrder(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (!order) return <div className="p-8">Order not found</div>;

    const customer = order.shippingInfo || {};

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/orders" className="text-gray-500 hover:text-gray-900">
                        &larr; Back to Orders
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Order #{order.id.slice(-8)}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Status:</span>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={isUpdating}
                        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm capitalize"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Customer Details */}
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-medium mb-4">Customer Information</h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="block text-gray-500">Name</span>
                            <span className="font-medium">{customer.firstName} {customer.lastName}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Email</span>
                            <span className="font-medium">{customer.email}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Phone</span>
                            <span className="font-medium">{customer.phone}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500">Address</span>
                            <span className="font-medium">
                                {customer.address}<br />
                                {customer.city}, {customer.state} {customer.zip}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date Placed</span>
                            <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total Amount</span>
                            <span className="font-bold text-lg">${Number(order.total).toFixed(2)}</span>
                        </div>
                        {order.user && (
                            <div className="flex justify-between pt-2 border-t">
                                <span className="text-gray-500">Registered User</span>
                                <span className="font-medium">{order.user.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                    <h2 className="text-lg font-medium">Order Items</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                    {order.items?.map((item, index) => (
                        <li key={index} className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center">
                                {/* Placeholder image or real image if available */}
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs text-gray-500">Item</span>
                                </div>
                                <div className="ml-4">
                                    <div className="font-medium text-gray-900">{item.name}</div>
                                    <div className="text-sm text-gray-500">Variant: {item.variant}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-8">
                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
