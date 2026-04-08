
import React, { useState, useMemo, useRef } from 'react';
import type { DiscoverHobby, DeckItem, EventRSVP } from '../../types';
import { DISCOVER_HOBBIES } from '../../constants';

interface ExpandableHobbyCardProps {
    hobby: DiscoverHobby;
    onBook: (hobby: DiscoverHobby, element: HTMLElement | null) => void;
    isShuffling: boolean;
    isHighlighted: boolean;
    isInDeck: boolean;
    isAnimating: boolean;
    isFeatured?: boolean;
    rsvpStatus?: 'going' | 'interested' | 'not_going';
    onRSVP?: (hobbyId: number | string, status: 'going' | 'interested' | 'not_going') => void;
}

const CATEGORY_COLORS: Record<string, string> = {
    Creative: '#B8FF00', Outdoors: '#34d399', Tech: '#818cf8', Wellness: '#f472b6', Social: '#fbbf24'
};

const CATEGORY_ICONS: Record<string, string> = {
    All: '✦', Creative: '🎨', Outdoors: '🌿', Tech: '⚡', Wellness: '🧘', Social: '🤝'
};

const getParticipantCount = (pts: number) => Math.floor(pts * 0.6) + 3;

const MOCK_AVATARS = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
];

const getCountdown = (timeStr: string): string => {
    const now = new Date();
    const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sundays: 0, Mondays: 1, Tuesdays: 2, Wednesdays: 3, Thursdays: 4, Fridays: 5, Saturdays: 6 };
    for (const [key, val] of Object.entries(dayMap)) {
        if (timeStr.includes(key)) {
            let daysUntil = val - now.getDay();
            if (daysUntil <= 0) daysUntil += 7;
            if (daysUntil === 1) return 'Tomorrow';
            return `${daysUntil} days away`;
        }
    }
    return 'This week';
};

const ExpandableHobbyCard: React.FC<ExpandableHobbyCardProps> = ({ hobby, onBook, isShuffling, isHighlighted, isInDeck, isAnimating, isFeatured, rsvpStatus, onRSVP }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [agree, setAgree] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const participantCount = getParticipantCount(hobby.pts);
    const isFree = !hobby.priceLabel || hobby.priceLabel === 'Free';
    const cardHeight = isFeatured ? 'h-[220px]' : 'h-[170px]';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agree) return;
        onBook(hobby, cardRef.current);
        setIsOpen(false);
    };

    const cardClasses = `relative bg-card rounded-3xl mb-3 overflow-hidden text-text-primary transition-all duration-300 group
        ${!isAnimating ? 'hover-lift' : ''}
        ${isShuffling ? 'animate-shuffle' : ''}
        ${isHighlighted || hobby.isMystery ? 'holographic-border' : 'border border-white/5'}
        ${isInDeck ? 'opacity-40' : ''}
        ${isAnimating ? 'opacity-0' : 'opacity-100'}`;

    return (
        <div ref={cardRef} className={cardClasses}>
            <div
                className={`relative ${cardHeight} cursor-pointer transition-transform active:scale-[0.99]`}
                onClick={() => !isInDeck && setIsOpen((v) => !v)}
                aria-expanded={isOpen}
            >
                {/* Background image */}
                <img
                    src={hobby.img}
                    alt={hobby.t}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${hobby.isMystery && !isInDeck ? 'blur-md' : ''}`}
                />
                {/* Cinematic gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Top row: badges */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                        {hobby.pts >= 100 && !hobby.isMystery && (
                            <span className="bg-accent text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                                Trending
                            </span>
                        )}
                        {isFeatured && (
                            <span className="bg-white/10 backdrop-blur text-white border border-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                                Featured
                            </span>
                        )}
                        {isFree && (
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Free
                            </span>
                        )}
                    </div>

                    {/* Points badge — pill style */}
                    {hobby.isMystery && !isInDeck ? (
                        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/40 flex-shrink-0">
                            <span className="font-black text-2xl text-white leading-none">?</span>
                        </div>
                    ) : (
                        <div className={`flex-shrink-0 flex flex-col items-center justify-center px-3 py-1.5 rounded-2xl backdrop-blur-sm
                            ${hobby.pts >= 100 ? 'bg-accent text-black shadow-lg shadow-accent/40' :
                              hobby.pts > 50 ? 'bg-lime-500/90 text-black' :
                              hobby.pts > 30 ? 'bg-white/20 text-white border border-white/20' :
                              'bg-white/10 text-white border border-white/10'}`}>
                            <span className="font-black text-base leading-none">{hobby.pts}</span>
                            <span className="text-[9px] font-bold tracking-widest opacity-80">PTS</span>
                        </div>
                    )}
                </div>

                {/* Bottom content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className={`font-black leading-tight mb-1 ${isFeatured ? 'text-2xl' : 'text-lg'} ${hobby.isMystery ? 'text-accent' : 'text-white'}`}>
                        {hobby.t}
                    </h3>

                    {/* Meta chips */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
                        <span className="bg-white/10 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                            📍 {hobby.location}
                        </span>
                        <span className="bg-white/10 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                            🕐 {hobby.time}
                        </span>
                        {hobby.level && hobby.level !== 'All' && (
                            <span className="bg-white/10 backdrop-blur-sm text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                                {hobby.level}
                            </span>
                        )}
                        {hobby.priceLabel && !isFree && (
                            <span className="bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                                {hobby.priceLabel}
                            </span>
                        )}
                    </div>

                    {/* Participants */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                            {MOCK_AVATARS.map((avatar, i) => (
                                <img key={i} src={avatar} className="w-5 h-5 rounded-full border-[1.5px] border-black object-cover" alt="" />
                            ))}
                        </div>
                        <span className="text-[11px] text-white/60 font-medium">{participantCount} going</span>
                        {rsvpStatus === 'going' ? (
                            <span className="ml-auto text-[11px] text-accent font-bold flex items-center gap-1">✓ Going</span>
                        ) : rsvpStatus === 'interested' ? (
                            <span className="ml-auto text-[11px] text-purple-400 font-medium">★ Interested</span>
                        ) : (
                            <span className="ml-auto text-[11px] text-white/40 font-medium">Tap to join →</span>
                        )}
                    </div>
                </div>

                {isInDeck && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                            <span className="text-accent">✓</span>
                            <span className="text-sm font-bold">Added to Deck</span>
                        </div>
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="p-4 animate-fade-in border-t border-white/5">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h4 className="font-black text-lg">{hobby.t}</h4>
                                <p className="text-text-tertiary text-xs mt-0.5">{hobby.host && `Hosted by ${hobby.host}`}</p>
                            </div>
                            {!isFree && <span className="text-accent font-black text-lg">{hobby.priceLabel}</span>}
                            {isFree && <span className="text-emerald-400 font-black text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Free</span>}
                        </div>

                        {/* Countdown + RSVP */}
                        <div className="flex items-center justify-between bg-background-secondary rounded-xl p-3 mb-3 border border-border">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">⏰</span>
                                <div>
                                    <p className="text-xs font-bold text-text-primary">{getCountdown(hobby.time)}</p>
                                    <p className="text-[10px] text-text-tertiary">{hobby.time}</p>
                                </div>
                            </div>
                            {onRSVP && (
                                <div className="flex gap-1.5">
                                    <button type="button" onClick={(e) => { e.stopPropagation(); onRSVP(hobby.id, 'going'); }}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${rsvpStatus === 'going' ? 'bg-accent text-black' : 'bg-background-tertiary text-text-secondary hover:bg-accent/20 hover:text-accent'}`}>
                                        Going
                                    </button>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); onRSVP(hobby.id, 'interested'); }}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${rsvpStatus === 'interested' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-background-tertiary text-text-secondary hover:bg-purple-500/10 hover:text-purple-400'}`}>
                                        Interested
                                    </button>
                                </div>
                            )}
                        </div>
                        {rsvpStatus === 'going' && (
                            <div className="flex items-center gap-2 mb-3 px-1">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <p className="text-[11px] text-accent font-semibold">You're going! We'll remind you before the event.</p>
                            </div>
                        )}

                        <p className="text-sm text-text-secondary mb-4 leading-relaxed">{hobby.description}</p>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold tracking-widest text-text-tertiary uppercase">Full Name</label>
                                <input type="text" required placeholder="Your name" className="w-full bg-background-secondary border border-border rounded-xl p-3 mt-1.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                            </div>
                            <div>
                                <label className="text-xs font-bold tracking-widest text-text-tertiary uppercase">Email</label>
                                <input type="email" required placeholder="your@email.com" className="w-full bg-background-secondary border border-border rounded-xl p-3 mt-1.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                            </div>
                            {hobby.priceLabel && !isFree && (
                                <div>
                                    <label className="text-xs font-bold tracking-widest text-text-tertiary uppercase">Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-background-secondary border border-border rounded-xl p-3 mt-1.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                                </div>
                            )}
                            <label className="flex items-center gap-3 cursor-pointer select-none p-3 bg-background-secondary rounded-xl border border-border">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={() => setAgree((v) => !v)}
                                    className="w-4 h-4 accent-accent"
                                />
                                <span className="text-xs text-text-secondary">I agree to the event terms and refund policy.</span>
                            </label>
                            <button
                                disabled={!agree}
                                type="submit"
                                className="w-full bg-primary-button text-primary-button-text font-black py-4 rounded-2xl neon-glow hover:bg-primary-button-hover transition-all disabled:opacity-30 disabled:neon-glow-none text-sm tracking-wide"
                            >
                                Confirm & Add to Deck {!isFree && hobby.priceLabel ? `· ${hobby.priceLabel}` : ''}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

interface DiscoverScreenProps {
    onBook: (hobby: DiscoverHobby, element: HTMLElement | null) => void;
    showToast: (message: string) => void;
    deckItems: DeckItem[];
    animatingHobbyId: number | string | null;
    userHobbies?: string[];
    rsvps?: EventRSVP[];
    onRSVP?: (hobbyId: number | string, status: 'going' | 'interested' | 'not_going') => void;
}

const HOBBY_CATEGORY_MAP: Record<string, string> = {
    Filmmaker: 'Creative', Photography: 'Creative', Painting: 'Creative', Drawing: 'Creative', Sculpting: 'Creative', Pottery: 'Creative', 'Music Production': 'Creative', DJing: 'Creative', Knitting: 'Creative',
    Hiking: 'Outdoors', Camping: 'Outdoors', Gardening: 'Outdoors', Astrophotography: 'Outdoors',
    Coding: 'Tech', 'Web Development': 'Tech', Gaming: 'Tech', Streaming: 'Tech',
    Yoga: 'Wellness', Meditation: 'Wellness', Baking: 'Wellness', Cooking: 'Wellness',
    Traveling: 'Social', Reading: 'Social', Writing: 'Social', Movies: 'Social', 'Film Analysis': 'Social',
};

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ onBook, showToast, deckItems, animatingHobbyId, userHobbies, rsvps, onRSVP }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Creative', 'Outdoors', 'Tech', 'Wellness', 'Social'];
    const [searchQuery, setSearchQuery] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);
    const [priceFilter, setPriceFilter] = useState('All');
    const priceFilters = ['All', 'Paid', 'Free'];

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setIsShuffling(true);
        setTimeout(() => setIsShuffling(false), 500);
    };

    const suggestedHobbies = useMemo(() => {
        if (!userHobbies || userHobbies.length === 0) return [];
        const userCategories = new Set(userHobbies.map(h => HOBBY_CATEGORY_MAP[h]).filter(Boolean));
        const deckIds = new Set(deckItems.map(d => d.id));
        return DISCOVER_HOBBIES
            .filter(h => !h.isMystery && userCategories.has(h.category) && !deckIds.has(h.id))
            .slice(0, 5);
    }, [userHobbies, deckItems]);

    const filteredHobbies = useMemo(() => {
        let hobbiesToShow: DiscoverHobby[];
        if (activeCategory === 'All') {
            hobbiesToShow = [...DISCOVER_HOBBIES];
        } else {
            hobbiesToShow = DISCOVER_HOBBIES.filter(hobby => hobby.category === activeCategory);
        }

        if (priceFilter === 'Paid') {
            hobbiesToShow = hobbiesToShow.filter(hobby => hobby.priceLabel && hobby.priceLabel !== 'Free');
        } else if (priceFilter === 'Free') {
            hobbiesToShow = hobbiesToShow.filter(hobby => !hobby.priceLabel || hobby.priceLabel === 'Free');
        }

        if (searchQuery) {
            hobbiesToShow = hobbiesToShow.filter(hobby =>
                hobby.t.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        for (let i = hobbiesToShow.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [hobbiesToShow[i], hobbiesToShow[j]] = [hobbiesToShow[j], hobbiesToShow[i]];
        }
        return hobbiesToShow;
    }, [activeCategory, searchQuery, priceFilter]);

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <main className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="px-4 pt-12 pb-3 flex-shrink-0">
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <span className="badge-pill mb-2 inline-flex" style={{ fontSize: '9px' }}>Find Your People</span>
                            <h1 className="text-2xl font-black text-text-primary" style={{ fontFamily: '"Inter", sans-serif' }}>Discover</h1>
                            <p className="text-text-tertiary text-xs mt-0.5">Classes, meetups & adventures near you.</p>
                        </div>
                        <button
                            onClick={() => showToast('Filters coming soon!')}
                            className="w-9 h-9 rounded-xl bg-background-secondary border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 bg-background-secondary rounded-2xl px-4 py-3 border border-border mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search hobbies, places..."
                            className="flex-grow bg-transparent focus:outline-none placeholder-text-tertiary text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="text-text-tertiary hover:text-text-primary text-lg leading-none">×</button>
                        )}
                    </div>

                    {/* Price filter */}
                    <div className="flex gap-2 mb-3 bg-background-secondary p-1 rounded-xl border border-border">
                        {priceFilters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setPriceFilter(filter)}
                                className={`w-full px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${priceFilter === filter ? 'bg-background-tertiary text-text-primary shadow' : 'text-text-tertiary hover:text-text-secondary'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Category filters with icons */}
                    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                        {categories.map(category => {
                            const catColor = CATEGORY_COLORS[category];
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${isActive ? 'text-black shadow-lg' : 'bg-background-secondary text-text-secondary border border-border hover:border-accent/30'}`}
                                    style={isActive ? { backgroundColor: catColor || 'var(--accent)', boxShadow: catColor ? `0 4px 16px ${catColor}30` : undefined } : {}}
                                >
                                    <span>{CATEGORY_ICONS[category]}</span>
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cards */}
                <div className="overflow-y-auto px-4 pb-24 flex-grow" style={{ scrollbarWidth: 'none' }}>
                    {/* Suggested For You */}
                    {suggestedHobbies.length > 0 && activeCategory === 'All' && !searchQuery && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2.5">
                                <span className="text-accent text-sm">✨</span>
                                <h3 className="text-sm font-bold text-text-primary">Suggested For You</h3>
                                <span className="text-[10px] text-text-tertiary ml-auto">Based on your hobbies</span>
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                                {suggestedHobbies.map(hobby => {
                                    const catColor = CATEGORY_COLORS[hobby.category] || '#B8FF00';
                                    return (
                                        <div key={`sug-${hobby.id}`} className="flex-shrink-0 w-[140px] rounded-2xl overflow-hidden bg-card border border-white/5 group cursor-pointer" onClick={() => showToast(`Check out ${hobby.t}!`)}>
                                            <div className="relative h-[100px]">
                                                <img src={hobby.img} alt={hobby.t} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <p className="text-white text-xs font-bold leading-tight truncate">{hobby.t}</p>
                                                </div>
                                                <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${catColor}20`, color: catColor, border: `1px solid ${catColor}40` }}>
                                                    {hobby.pts} pts
                                                </span>
                                            </div>
                                            <div className="p-2">
                                                <p className="text-[10px] text-text-tertiary truncate">📍 {hobby.location}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <div className="flex -space-x-1">
                                                        {MOCK_AVATARS.slice(0, 2).map((a, i) => (
                                                            <img key={i} src={a} className="w-3.5 h-3.5 rounded-full border border-black object-cover" alt="" />
                                                        ))}
                                                    </div>
                                                    <span className="text-[9px] text-text-tertiary">{getParticipantCount(hobby.pts)} going</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {filteredHobbies.map((hobby, index) => {
                        const isInDeck = deckItems.some(item => item.id === hobby.id);
                        const rsvp = rsvps?.find(r => r.hobbyId === hobby.id);
                        return (
                            <ExpandableHobbyCard
                                key={hobby.id}
                                hobby={hobby}
                                onBook={onBook}
                                isShuffling={isShuffling}
                                isHighlighted={hobby.pts >= 100}
                                isInDeck={isInDeck}
                                isAnimating={animatingHobbyId === hobby.id}
                                isFeatured={index === 0}
                                rsvpStatus={rsvp?.status}
                                onRSVP={onRSVP}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default DiscoverScreen;
