import Link from 'next/link';

export default function CheckoutSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <svg className="h-12 w-12 text-green-600 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Order Confirmed!</h1>
            <p className="text-gray-500 max-w-md mb-8">
                Thank you for your purchase. We have received your order and will send a confirmation email shortly.
            </p>
            <div className="space-x-4">
                <Link
                    href="/products"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary-dark"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
