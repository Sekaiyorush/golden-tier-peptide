"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutForm() {
    const router = useRouter();
    const { clearCart, cart, cartTotal } = useCart();
    const { t, language } = useLanguage();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Finalize
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitShipping = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleLineOrderClick = () => {
        setIsLoading(true);

        const itemsList = cart.map(item => {
            const name = language === 'th' && item.name_th ? item.name_th : item.name;
            return `- ${name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}`;
        }).join('\n');
        const total = cartTotal.toFixed(2);

        const message = `New Order from Golden Tier Peptide\n\nCustomer: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nAddress: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}\n\nItems:\n${itemsList}\n\nTotal: $${total}\n\nPlease confirm my order.`;

        const encodedMessage = encodeURIComponent(message);
        const lineUrl = `https://line.me/R/msg/text/?${encodedMessage}`;

        // Open LINE in new tab
        window.open(lineUrl, '_blank');

        // Clear cart and redirect to success
        clearCart();
        router.push('/checkout/success');
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            {/* Steps Indicator */}
            <div className="flex items-center space-x-4 text-sm font-medium">
                <div className={`flex items-center ${step === 1 ? 'text-primary' : 'text-gray-500'}`}>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step === 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                        1
                    </div>
                    <span className="ml-2">{t('checkout.shippingStep')}</span>
                </div>
                <div className="h-px w-12 bg-gray-300" />
                <div className={`flex items-center ${step === 2 ? 'text-primary' : 'text-gray-500'}`}>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${step === 2 ? 'border-primary bg-primary text-white' : (step > 2 ? 'border-primary text-primary' : 'border-gray-300')}`}>
                        2
                    </div>
                    <span className="ml-2">{t('checkout.finalizeStep')}</span>
                </div>
            </div>

            {step === 1 ? (
                <form onSubmit={handleSubmitShipping} className="space-y-6 animate-in slide-in-from-left duration-300">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">{t('checkout.contactInfo')}</h2>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('checkout.email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">{t('checkout.shippingAddress')}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">{t('checkout.firstName')}</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm border focus:ring-primary focus:border-primary"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">{t('checkout.lastName')}</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm border focus:ring-primary focus:border-primary"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('checkout.address')}</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm border focus:ring-primary focus:border-primary"
                                placeholder="123 Research Lane"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-3">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">{t('checkout.city')}</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm border focus:ring-primary focus:border-primary"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">{t('checkout.state')}</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm border focus:ring-primary focus:border-primary"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">{t('checkout.zip')}</label>
                                <input
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    required
                                    className="mt-1 block w-full rounded-md border-input bg-background px-3 py-2 text-sm border focus:ring-primary focus:border-primary"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow hover:bg-primary-dark transition-colors"
                    >
                        {t('checkout.continue')}
                    </button>
                </form>
            ) : (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">{t('checkout.completeOrder')}</h2>
                        <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center">
                            <p className="text-sm text-green-800 mb-4 font-medium">
                                {t('checkout.lineInstruction')}
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleLineOrderClick}
                                    disabled={isLoading}
                                    className="flex items-center justify-center rounded-md bg-[#00B900] px-6 py-3 text-base font-bold text-white shadow hover:bg-[#009900] transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                                >
                                    <svg className="mr-2 h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.156 12.008c0-5.067-4.996-9.192-11.133-9.192C3.89 2.816-.07 7 .07 12.008c0 4.545 4.027 8.358 9.423 9.073.366.079.865.242 1.002.555.114.263.075.669.037.954-.055.45-.145 1.152-.284 2.015-.09.585-.453 2.274 2.126 1.258 2.583-1.022 7.03-4.14 9.593-7.1 2.37-2.673 3.96-5.61 3.96-8.757z" />
                                    </svg>
                                    {isLoading ? t('checkout.processing') : t('checkout.orderViaLine')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            {t('checkout.back')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
