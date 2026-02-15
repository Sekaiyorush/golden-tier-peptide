"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState(searchParams.get('q') || '');
    const [query] = useDebounce(text, 500);

    const pathname = usePathname();

    useEffect(() => {
        if (query) {
            router.push(`/products?q=${encodeURIComponent(query)}`);
        } else if (pathname === '/products' && searchParams.get('q')) {
            router.push('/products');
        }
    }, [query, router, pathname, searchParams]);

    return (
        <div className="relative w-full max-w-sm hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
                type="search"
                id="default-search"
                className="block w-full p-2 pl-10 text-sm text-foreground border border-gray-300 rounded-lg bg-background focus:ring-primary focus:border-primary placeholder-gray-400"
                placeholder="Search peptides..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}
