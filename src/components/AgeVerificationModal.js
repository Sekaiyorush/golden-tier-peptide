"use client";

import { useState, useEffect } from "react";

export default function AgeVerificationModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasVerified = localStorage.getItem("age_verified");
        if (!hasVerified) {
            setIsVisible(true);
        }
    }, []);

    const handleVerify = () => {
        localStorage.setItem("age_verified", "true");
        setIsVisible(false);
    };

    const handleExit = () => {
        window.location.href = "https://www.google.com";
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 transition-opacity">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl border border-primary">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Age Verification</h2>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
                </div>

                <p className="text-gray-600 mb-6 text-lg">
                    This website contains products intended for **laboratory research use only**. You must be at least 18 years old to enter.
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleVerify}
                        className="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-md transition-colors text-lg shadow-lg"
                    >
                        I am 18 or older - Enter Site
                    </button>
                    <button
                        onClick={handleExit}
                        className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
                    >
                        I am under 18 - Exit
                    </button>
                </div>

                <p className="mt-6 text-xs text-gray-400">
                    By entering, you confirm that you are of legal age and understand the terms of use.
                </p>
            </div>
        </div>
    );
}
