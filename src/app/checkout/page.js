import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';

export const metadata = {
    title: "Checkout | Golden Tier Peptide",
};

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-background">
            <div className="container px-4 py-12 md:px-6 lg:py-16">
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center md:text-left">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7">
                        <CheckoutForm />
                    </div>
                    <div className="lg:col-span-5">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}
