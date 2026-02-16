"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/data/locales';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('th'); // Default to Thai

    const t = (path, params = {}) => {
        const keys = path.split('.');
        let value = translations[language];
        for (const key of keys) {
            if (value && value[key]) {
                value = value[key];
            } else {
                return path; // Fallback to key if not found
            }
        }

        // Perform interpolation
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            Object.keys(params).forEach(key => {
                value = value.replace(`{${key}}`, params[key]);
            });
        }

        return value;
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'th' ? 'en' : 'th'));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
