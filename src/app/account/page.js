"use client";

import { useSession } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";

export default function AccountPage() {
    const { data: session } = useSession();
    const { t } = useLanguage();

    if (!session) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-5">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    {t('account.dashboard')}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    {t('account.welcomeBack', { name: session.user.name || 'User' })}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Card: Points */}
                <div className="overflow-hidden rounded-lg bg-surface-alt px-4 py-5 shadow sm:p-6 border border-primary/20">
                    <dt className="truncate text-sm font-medium text-gray-500">
                        {t('account.loyaltyPoints')}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-primary">
                        {session.user.points || 0}
                    </dd>
                </div>

                {/* Stats Card: Total Orders (Placeholder for now) */}
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-200">
                    <dt className="truncate text-sm font-medium text-gray-500">
                        {t('account.totalOrders')}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        -
                    </dd>
                </div>
            </div>

            <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900">{t('account.recentActivity')}</h4>
                <div className="mt-4 rounded-md bg-gray-50 p-4 text-sm text-gray-500 text-center">
                    {t('account.noRecentActivity')}
                </div>
            </div>
        </div>
    );
}
