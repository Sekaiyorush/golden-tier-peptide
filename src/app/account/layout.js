"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSession, signOut } from "next-auth/react";

export default function AccountLayout({ children }) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const { data: session } = useSession();

    const navigation = [
        { name: t('account.dashboard'), href: "/account", current: pathname === "/account" },
        { name: t('account.orders'), href: "/account/orders", current: pathname.startsWith("/account/orders") },
        { name: t('account.profile'), href: "/account/profile", current: pathname.startsWith("/account/profile") },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
                    <nav className="space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
                                    ${item.current
                                        ? "bg-primary text-white hover:bg-primary-dark"
                                        : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                                aria-current={item.current ? "page" : undefined}
                            >
                                <span className="truncate">{item.name}</span>
                            </Link>
                        ))}
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-900"
                        >
                            <span className="truncate">{t('account.signOut')}</span>
                        </button>
                    </nav>
                </aside>

                <main className="lg:col-span-9 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
