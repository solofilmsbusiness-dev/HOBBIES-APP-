
import React, { useState, useMemo, useRef } from 'react';
import type { DiscoverHobby, DeckItem } from '../../types';
import { DISCOVER_HOBBIES } from '../../constants';

interface ExpandableHobbyCardProps {
    hobby: DiscoverHobby;
    onBook: (hobby: DiscoverHobby, element: HTMLElement | null) => void;
    isShuffling: boolean;
    isHighlighted: boolean;
    isInDeck: boolean;
    isAnimating: boolean;
}

const ExpandableHobbyCard: React.FC<ExpandableHobbyCardProps> = ({ hobby, onBook, isShuffling, isHighlighted, isInDeck, isAnimating }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [agree, setAgree] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agree) return;
        onBook(hobby, cardRef.current);
        setIsOpen(false);
    };

    const getPointStyle = (points: number) => {
        if (points >= 100) {
            return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/50';
        }
        if (points > 50) {
            return 'bg-yellow-500 text-black';
        }
        if (points > 30) {
            return 'bg-slate-400 text-black';
        }
        return 'bg-amber-700 text-white';
    };

    const cardClasses = `bg-card rounded-2xl mb-4 overflow-hidden text-text-primary transition-all duration-300 group ${!isAnimating && 'hover-lift'
        } ${isShuffling ? 'animate-shuffle' : ''
        } ${isHighlighted || hobby.isMystery ? 'holographic-border' : ''} ${isInDeck ? 'opacity-50' : ''
        } ${isAnimating ? 'opacity-0' : 'opacity-100'}`;

    return (
        <div ref={cardRef} className={cardClasses}>
            <div
                className="relative h-[140px] cursor-pointer transition-transform active:scale-[0.98]"
                onClick={() => !isInDeck && setIsOpen((v) => !v)}
                aria-expanded={isOpen}
            >
                <img
                    src={hobby.img}
                    alt={hobby.t}
                    className={`w-full h-full object-cover ${hobby.isMystery && !isInDeck ? 'blur-md' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 right-3 flex flex-col items-center">
                    {hobby.isMystery && !isInDeck ? (
                        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/50 transition-transform group-hover:scale-110`}>
                            <span className="font-bold text-3xl leading-none">?</span>
                        </div>
                    ) : (
                        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full ${getPointStyle(hobby.pts)} transition-transform group-hover:scale-110`}>
                            <span className="font-bold text-xl leading-none">{hobby.pts}</span>
                            <span className="text-xs font-semibold leading-none">PTS</span>
                        </div>
                    )}
                    {hobby.priceLabel && hobby.priceLabel !== 'Free' && (
                        <div
                            className="mt-1 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full cursor-pointer"
                            aria-label={`Price: ${hobby.priceLabel}`}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {hobby.priceLabel}
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 p-4 flex flex-col justify-start">
                    <h3 className={`text-xl font-bold ${hobby.isMystery ? 'text-yellow-400' : ''}`} >{hobby.t}</h3>
                    <p className="text-sm text-gray-300">
                        {hobby.location} • {hobby.time}
                    </p>
                </div>
                {isInDeck && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <p className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">Moved to Deck</p>
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="p-4 animate-fade-in">
                    <form onSubmit={handleSubmit}>
                        <h4 className="font-bold text-lg mb-1">Booking</h4>
                        <p className="text-sm text-text-secondary mb-4">{hobby.description}</p>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-text-tertiary">Full Name</label>
                                <input type="text" required placeholder="Your name" className="w-full bg-background-secondary border border-border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                            </div>
                            <div>
                                <label className="text-xs text-text-tertiary">Email</label>
                                <input type="email" required placeholder="your@email.com" className="w-full bg-background-secondary border border-border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                            </div>
                            {hobby.priceLabel && !hobby.priceLabel.includes('Free') && (
                                <div>
                                    <label className="text-xs text-text-tertiary">Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-background-secondary border border-border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                                </div>
                            )}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
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
                                className="w-full bg-primary-button text-primary-button-text font-bold py-3 rounded-full hover:bg-primary-button-hover transition-colors disabled:opacity-50"
                            >
                                Confirm & Add to Deck {hobby.priceLabel ? `• ${hobby.priceLabel}` : ''}
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
}

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ onBook, showToast, deckItems, animatingHobbyId }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Creative', 'Outdoors', 'Tech', 'Wellness', 'Social'];
    const [searchQuery, setSearchQuery] = useState('');
    const [isShuffling, setIsShuffling] = useState(false);
    const [priceFilter, setPriceFilter] = useState('All');
    const priceFilters = ['All', 'Paid', 'Free'];

    const handlePriceFilterClick = (filter: string) => {
        setPriceFilter(filter);
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setIsShuffling(true);
        setTimeout(() => setIsShuffling(false), 500);
    };

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
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <main className="relative z-10 flex flex-col h-full">
                <div className="p-4 pt-12 pb-2 flex-shrink-0 bg-background-primary z-10">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl" style={{ fontFamily: '"Lobster", cursive' }}>Find Your Hobby</h1>
                        <p className="text-text-secondary mt-1 text-sm">AI-powered search for classes & meetups.</p>
                    </div>

                    <div className="flex items-center gap-2 bg-card rounded-full p-1 border border-border mb-4">
                        <input
                            type="text"
                            placeholder="Search for a hobby..."
                            className="flex-grow bg-transparent px-4 py-2 focus:outline-none placeholder-text-tertiary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={() => showToast('AI search coming soon!')} className="bg-primary-button text-primary-button-text font-semibold py-2 px-4 rounded-full hover:bg-primary-button-hover transition-colors">
                            Search
                        </button>
                    </div>

                    <div className="flex gap-2 mb-2 bg-card p-1 rounded-full">
                        {priceFilters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => handlePriceFilterClick(filter)}
                                className={`w-full px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${priceFilter === filter ? 'bg-background-tertiary text-text-primary' : 'bg-transparent text-text-secondary hover:bg-background-secondary'}`}
                                aria-pressed={priceFilter === filter}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${activeCategory === category
                                        ? 'bg-primary-button text-primary-button-text'
                                        : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-y-auto px-4 pb-24 flex-grow">
                    <div>{filteredHobbies.map((hobby) => {
                        const isInDeck = deckItems.some(item => item.id === hobby.id);
                        return (
                            <ExpandableHobbyCard
                                key={hobby.id}
                                hobby={hobby}
                                onBook={onBook}
                                isShuffling={isShuffling}
                                isHighlighted={hobby.pts >= 100}
                                isInDeck={isInDeck}
                                isAnimating={animatingHobbyId === hobby.id}
                            />
                        )
                    })}</div>
                </div>
            </main>
        </div>
    );
};

export default DiscoverScreen;
