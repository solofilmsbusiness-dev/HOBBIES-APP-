
import React from 'react';

interface CreateAccountScreenProps {
    onAccountCreate: () => void;
    onBack: () => void;
}

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ onAccountCreate, onBack }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAccountCreate();
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <div className="absolute top-14 right-6 w-2.5 h-2.5 rounded-full bg-accent opacity-70 animate-neon-pulse" />
            <button onClick={onBack} className="absolute top-6 left-6 z-20 text-text-primary text-3xl leading-none font-bold">&larr;</button>
            <main className="relative z-10 overflow-y-auto p-6 pt-16 pb-8 h-full">
                <div className="mb-8">
                    <span className="badge-pill mb-4 inline-flex">Join The Community</span>
                    <h1 className="text-4xl font-black leading-tight mt-3" style={{ fontFamily: '"Inter", sans-serif' }}>
                        Create Your<br /><span className="text-accent">Profile</span>
                    </h1>
                    <p className="text-text-tertiary text-sm mt-2">Start your hobby journey today.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Full Name</label>
                            <input type="text" required placeholder="Your Name" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                        </div>
                        <div>
                            <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Username</label>
                            <input type="text" required placeholder="yourusername" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Email</label>
                        <input type="email" required placeholder="your@email.com" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                    </div>
                    <div>
                        <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">City</label>
                            <input type="text" required placeholder="e.g., New York" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                        </div>
                        <div>
                            <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">State</label>
                            <input type="text" required placeholder="e.g., NY" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Your Favorite Hobby</label>
                        <input type="text" required placeholder="e.g., Photography, Painting" className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                    </div>
                    <div>
                        <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Short Bio</label>
                        <textarea placeholder="Tell us a little about yourself..." rows={3} className="w-full bg-background-secondary border border-border rounded-xl p-3.5 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary-button text-primary-button-text font-bold py-4 rounded-2xl neon-glow hover:bg-primary-button-hover transition-all">
                        Get Started
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateAccountScreen;
