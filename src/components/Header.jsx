"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import SearchBar from './SearchBar';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { toggleCart, cartCount } = useCart();
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-primary">
                        Golden Tier <span className="text-accent">Peptide</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/products" className="transition-colors hover:text-primary">
                        {t('header.products')}
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary">
                        {t('header.about')}
                    </Link>
                    <Link href="/research" className="transition-colors hover:text-primary">
                        {t('header.research')}
                    </Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">
                        {t('header.contact')}
                    </Link>
                </nav>

                <div className="hidden md:flex flex-1 max-w-sm mx-6">
                    <SearchBar />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleLanguage}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                        <span>{language === 'en' ? '🇺🇸' : '🇹🇭'}</span>
                        <span>{language.toUpperCase()}</span>
                    </button>

                    <button
                        onClick={toggleCart}
                        className="relative group p-2 hover:bg-surface-alt rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-foreground group-hover:text-primary transition-colors">
                            <circle cx="8" cy="21" r="1"></circle>
                            <circle cx="19" cy="21" r="1"></circle>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                        </svg>
                        <span className="sr-only">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <Link
                        href="/login"
                        className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        {t('header.signIn')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="sr-only">Toggle menu</span>
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border bg-background p-4">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/products" className="text-sm font-medium hover:text-primary">{t('header.products')}</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary">{t('header.about')}</Link>
                        <Link href="/research" className="text-sm font-medium hover:text-primary">{t('header.research')}</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary">{t('header.contact')}</Link>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm font-medium">Language</span>
                            <button
                                onClick={toggleLanguage}
                                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <span>{language === 'en' ? '🇺🇸' : '🇹🇭'}</span>
                                <span>{language.toUpperCase()}</span>
                            </button>
                        </div>
                        <Link
                            href="/login"
                            className="flex w-full h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-dark"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.signIn')}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
