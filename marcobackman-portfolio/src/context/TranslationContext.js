import React, { createContext, useState, useEffect, useContext } from 'react';

let globalMessages = {};

// Create the context
export const TranslationContext = createContext({
    lang: 'kr',
    setLanguage: () => {},
});

// Translation Provider Component
export const TranslationProvider = ({ children }) => {

    const [language, setLanguage] = useState(() => {
        // Retrieve saved language from localStorage or fallback to default 'en'
        return localStorage.getItem('appLanguage') || 'kr';
    });

    const [messages, setMessages] = useState({});  // Stores translations

    // Load translation JSON file based on selected language
    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const response = await fetch(`/locales/${language}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${language} translations`);
                }
                const data = await response.json();
                setMessages(data);
                globalMessages = data;
            } catch (err) {
                console.error('Error loading translations:', err);
                setMessages({
                    welcome: "Welcome" // A default fallback message
                });
            }
        };

        loadTranslations();
    }, [language]);

    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    // The context values being provided
    return (
        <TranslationContext.Provider value={{ messages, language, setLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

// Custom Hook for using Translation Context
export const useTranslation = () => {
    return useContext(TranslationContext);
};


export const getGlobalMessages = () => globalMessages;