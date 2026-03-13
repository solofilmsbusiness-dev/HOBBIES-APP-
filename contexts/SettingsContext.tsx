
import React, { useState, useEffect, createContext, useContext } from 'react';
import type { Settings } from '../types';

const defaultSettings: Settings = {
    theme: 'dark', // 'light', 'dark', 'system', 'slick'
    reducedMotion: false,
    fontSize: 16, // base font size
    mediaAutoplay: true,
    soundHaptics: true,
    badgeStyle: 'dot', // 'dot', 'count'
    privacyDefault: 'friends', // 'public', 'friends', 'private'
};

interface SettingsContextProps {
    settings: Settings;
    updateSetting: (key: keyof Settings, value: any) => void;
}

const SettingsContext = createContext<SettingsContextProps>({
    settings: defaultSettings,
    updateSetting: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const savedSettings = localStorage.getItem('hobbyApp-settings');
            return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
        } catch (error) {
            console.error("Failed to parse settings from localStorage", error);
            return defaultSettings;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('hobbyApp-settings', JSON.stringify(settings));
        } catch (error) {
            console.error("Failed to save settings to localStorage", error);
        }

        // Apply theme to root element
        const root = document.documentElement;
        let themeToApply = settings.theme;
        if (themeToApply === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            themeToApply = systemPrefersDark ? 'dark' : 'light';
        }
        root.setAttribute('data-theme', themeToApply);

        if (settings.reducedMotion) {
            root.setAttribute('data-reduced-motion', 'true');
        } else {
            root.removeAttribute('data-reduced-motion');
        }

        root.style.fontSize = `${settings.fontSize}px`;
    }, [settings]);

    const updateSetting = (key: keyof Settings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const value = { settings, updateSetting };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
