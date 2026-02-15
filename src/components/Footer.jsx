import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="border-t border-border bg-surface-alt">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold tracking-tight text-primary">Golden Tier Peptide</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Premium research peptides for scientific exploration. Committed to purity, rigorous testing, and exceptional quality.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Products</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link href="/products/bpc-157" className="hover:text-primary">BPC-157</Link></li>
                            <li><Link href="/products/tb-500" className="hover:text-primary">TB-500</Link></li>
                            <li><Link href="/products/cjc-1295" className="hover:text-primary">CJC-1295</Link></li>
                            <li><Link href="/products/ipamorelin" className="hover:text-primary">Ipamorelin</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/quality" className="hover:text-primary">Quality Control</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact Support</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Newsletter</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex space-x-2">
                            <input
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-border pt-8 text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Golden Tier Peptide. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 text-xs">For Research Purposes Only. Not for Human Consumption.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
