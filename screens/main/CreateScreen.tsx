
import React, { useState, useMemo } from 'react';
import type { DeckItem } from '../../types';

interface CreateHobbyFormProps {
    onHobbyCreate: (newHobby: any) => void;
}

const CreateHobbyForm: React.FC<CreateHobbyFormProps> = ({ onHobbyCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        time: '',
        description: '',
        points: '',
        price: '',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [pointsError, setPointsError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'points') {
            setPointsError('');
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const points = parseInt(formData.points, 10) || 0;
        if (points > 25) {
            setPointsError('Points cannot exceed 25 for user-created events.');
            return;
        }

        const newHobby = {
            id: Date.now(),
            title: formData.title,
            thumb: imagePreview || 'https://placehold.co/200x200/1C1C1E/ffffff?text=New',
            location: formData.location,
            time: formData.time,
            host: 'You',
            level: 'All',
            price: formData.price || 'Free',
            distance: '0 mi',
            points: points,
            description: formData.description,
            cta: 'Join',
        };
        onHobbyCreate(newHobby);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
            <div>
                <label className="text-sm text-text-secondary">Hobby Photo</label>
                <div className="mt-1 flex items-center gap-4">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Hobby preview" className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                        <div className="w-16 h-16 rounded-lg bg-background-secondary border border-border flex items-center justify-center text-text-tertiary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <label htmlFor="file-upload" className="cursor-pointer bg-background-tertiary text-text-primary font-semibold py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors">
                        <span>Upload Image</span>
                    </label>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                </div>
            </div>
            <div>
                <label className="text-sm text-text-secondary">Hobby Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Morning Pottery Session"
                    className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-text-secondary">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Community Studio"
                        className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                <div>
                    <label className="text-sm text-text-secondary">Time</label>
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Saturdays, 9am"
                        className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
            </div>
            <div>
                <label className="text-sm text-text-secondary">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell everyone about your hobby event..."
                    rows={3}
                    className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-text-secondary">Points Awarded</label>
                    <input
                        type="number"
                        name="points"
                        value={formData.points}
                        onChange={handleChange}
                        required
                        placeholder="e.g., 25"
                        className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <p className="text-xs text-text-tertiary mt-1">Max 25 points. Higher amounts require approval.</p>
                    {pointsError && <p className="text-xs text-red-500 mt-1">{pointsError}</p>}
                </div>
                <div>
                    <label className="text-sm text-text-secondary">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g., $25 or Free"
                        className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-primary-button text-primary-button-text font-bold py-3 rounded-full hover:bg-primary-button-hover transition-colors"
            >
                Create Hobby Event
            </button>
        </form>
    );
};

interface CreateScreenProps {
    onBook: (hobby: any) => void;
    hobbyData: any[];
    onHobbyCreate: (newHobby: any) => void;
    deckItems: DeckItem[];
    animatingHobbyId: number | string | null;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ onBook, hobbyData, onHobbyCreate, deckItems, animatingHobbyId }) => {
    const [query, setQuery] = useState('');
    const [openId, setOpenId] = useState<number | null>(null);
    const [view, setView] = useState('join'); // 'join' or 'create'

    const filteredHobbies = useMemo(() => {
        const q = query.toLowerCase();
        if (!q) return hobbyData;
        return hobbyData.filter(
            (h) =>
                h.title.toLowerCase().includes(q) ||
                h.description.toLowerCase().includes(q) ||
                h.location.toLowerCase().includes(q),
        );
    }, [query, hobbyData]);

    const handleToggle = (id: number) => setOpenId((v) => (v === id ? null : id));

    const handleCreateHobby = (newHobby: any) => {
        onHobbyCreate(newHobby);
        setView('join'); // Switch back to join view after creation
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <main className="relative z-10 overflow-y-auto p-4 pt-12 pb-24 h-full">
                <div className="text-center mb-6">
                    <h1 className="text-4xl" style={{ fontFamily: '"Lobster", cursive' }}>
                        Start Something New
                    </h1>
                    <p className="text-text-secondary mt-1 text-sm">
                        Create or join a new hobby group
                    </p>
                </div>
                <div className="my-4 p-1 bg-card rounded-full flex justify-between items-center">
                    <button
                        onClick={() => setView('join')}
                        className={`w-full text-center py-2 rounded-full text-sm font-semibold transition-colors ${view === 'join' ? 'bg-background-tertiary text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}>
                        Join Hobby
                    </button>
                    <button
                        onClick={() => setView('create')}
                        className={`w-full text-center py-2 rounded-full text-sm font-semibold transition-colors ${view === 'create' ? 'bg-background-tertiary text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}>
                        Create Hobby
                    </button>
                </div>

                {view === 'join' && (
                    <>
                        <div className="flex items-center gap-2 bg-card rounded-full p-1 border border-border mb-4">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search hobbies or locations (AI)"
                                className="flex-grow bg-transparent px-4 py-2 focus:outline-none placeholder-text-tertiary"
                            />
                            <button onClick={() => { }} className="bg-primary-button text-primary-button-text font-semibold py-2 px-4 rounded-full hover:bg-primary-button-hover transition-colors">
                                Search
                            </button>
                        </div>
                        <div className="space-y-3">
                            {filteredHobbies.length > 0 ? (
                                filteredHobbies.map((hobby) => {
                                    const isOpen = openId === hobby.id;
                                    const isInDeck = deckItems.some(item => item.id === hobby.id);
                                    return (
                                        <section key={hobby.id} className={`bg-card rounded-2xl overflow-hidden transition-opacity hover-lift ${animatingHobbyId === hobby.id ? 'opacity-0' : 'opacity-100'}`}>
                                            <header onClick={() => !isInDeck && handleToggle(hobby.id)} className={`flex items-center p-4 gap-4 ${!isInDeck && 'cursor-pointer'}`}>
                                                <img src={hobby.thumb} alt="" className="w-14 h-14 rounded-lg object-cover" />
                                                <div className="flex-grow">
                                                    <h3 className="font-bold text-text-primary">{hobby.title}</h3>
                                                    <p className="text-sm text-text-secondary">
                                                        {hobby.location} • {hobby.time}
                                                    </p>
                                                </div>
                                                {!isInDeck && <div className={`text-xl text-text-tertiary transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</div>}
                                            </header>
                                            {isOpen && (
                                                <div className="px-4 pb-4">
                                                    <div className="flex flex-wrap gap-2 mb-3 border-t border-border pt-3">
                                                        <span className="bg-background-tertiary text-text-secondary text-xs px-2 py-1 rounded-full">Host: {hobby.host}</span>
                                                        <span className="bg-background-tertiary text-text-secondary text-xs px-2 py-1 rounded-full">Level: {hobby.level}</span>
                                                        <span className="bg-background-tertiary text-text-secondary text-xs px-2 py-1 rounded-full">Price: {hobby.price}</span>
                                                        <span className="bg-background-tertiary text-text-secondary text-xs px-2 py-1 rounded-full">Distance: {hobby.distance}</span>
                                                        <span className="bg-background-tertiary text-text-secondary text-xs px-2 py-1 rounded-full">Earn {hobby.points} pts</span>
                                                    </div>
                                                    <p className="text-text-secondary text-sm mb-4">{hobby.description}</p>
                                                    <button onClick={() => onBook(hobby)} className="w-full bg-primary-button text-primary-button-text font-bold py-3 rounded-full hover:bg-primary-button-hover transition-colors">
                                                        {hobby.cta}
                                                    </button>
                                                </div>
                                            )}
                                        </section>
                                    );
                                })
                            ) : (
                                <div className="text-center text-text-tertiary mt-8">
                                    <p>No results found.</p>
                                    <p className="text-sm">Try another term (e.g., “pottery”, “downtown”, “free”).</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {view === 'create' && <CreateHobbyForm onHobbyCreate={handleCreateHobby} />}
            </main>
        </div>
    );
};

export default CreateScreen;
