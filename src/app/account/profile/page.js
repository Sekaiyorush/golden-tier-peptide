"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfilePage() {
    const { data: session } = useSession();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if (!session) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Placeholder for future update logic
        setTimeout(() => {
            setIsLoading(false);
            setMessage({ type: 'success', text: 'Profile updated successfully (Mock)' });
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    {t('account.profile')}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {t('checkout.firstName')} / Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={session.user.name}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={session.user.email}
                            disabled
                            className="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message.text}
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? t('checkout.processing') : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
