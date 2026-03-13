
import React from 'react';
import { SearchIcon, SocialIcon, PlusIcon, StarIcon, UserIcon } from '../common/Icons';

interface TabBarProps {
    activeTab: string;
    onTabClick: (tab: string) => void;
    badgeCounts: { social: number };
    socialTabRef: React.RefObject<HTMLButtonElement>;
    isDeckPulsing: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabClick, badgeCounts, socialTabRef, isDeckPulsing }) => {
    const tabs = [
        { id: 'discover', icon: SearchIcon, label: 'Discover' },
        { id: 'social', icon: SocialIcon, label: 'Social', badge: badgeCounts.social || 0 },
        { id: 'create', icon: PlusIcon, label: 'Create' },
        { id: 'points', icon: StarIcon, label: 'Points' },
        { id: 'profile', icon: UserIcon, label: 'Profile' },
    ];

    return (
        <nav
            className="absolute bottom-0 left-0 right-0 bg-tab-bar border-t border-border flex justify-around h-20 rounded-b-[48px] z-20 px-4"
            role="tablist"
            aria-label="Primary"
        >
            {tabs.map(({ id, icon: Icon, label, badge }) => {
                const isActive = activeTab === id;
                return (
                    <button
                        key={id}
                        ref={id === 'social' ? socialTabRef : null}
                        onClick={() => onTabClick(id)}
                        role="tab"
                        aria-selected={isActive}
                        className={`relative flex flex-col items-center justify-center p-2 w-full transition-colors ${isActive ? 'text-tab-bar-active' : 'text-tab-bar-inactive hover:text-tab-bar-hover'
                            } ${id === 'social' && isDeckPulsing ? 'animate-pulse-deck' : ''}`}
                    >
                        {badge > 0 && (
                            <span className="absolute top-2 right-1/2 translate-x-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {badge}
                            </span>
                        )}
                        <Icon className="w-7 h-7" filled={isActive} />
                        <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`} >{label}</span>
                    </button>
                );
            })}
        </nav>
    );
};
