"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products"; // Loading products for count

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: products.length,
        totalCustomers: 0
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    // Mock fetching stats
    useEffect(() => {
        // In a real app, fetch from /api/admin/stats
        setStats(prev => ({
            ...prev,
            totalSales: 15420,
            totalOrders: 24,
            totalCustomers: 12
        }));
    }, []);

    if (status === "loading") {
        return <p className="p-10 text-center">Loading...</p>;
    }

    if (!session) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total Sales</p>
                    <p className="text-2xl font-bold text-primary">${stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total Customers</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalCustomers}</p>
                </div>
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-primary hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm">No recent orders (Mock).</p>
                        {/* Placeholder for order list */}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                    <div className="flex flex-col space-y-3">
                        <Link href="/admin/products/new" className="text-primary hover:underline">Add New Product</Link>
                        <Link href="/admin/orders" className="text-primary hover:underline">Manage Orders</Link>
                        <Link href="/admin/customers" className="text-primary hover:underline">View Customers</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
