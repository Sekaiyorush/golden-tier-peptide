"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('/api/users');
            if (res.ok) {
                const data = await res.json();
                setCustomers(data);
            }
        } catch (error) {
            console.error('Failed to fetch customers', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="p-8">Loading customers...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            </div>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Points</th>
                                <th className="px-6 py-3">Joined</th>
                                {/* <th className="px-6 py-3">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {customer.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {customer.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                                                ${customer.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                                {customer.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {customer.points}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
