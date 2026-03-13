
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
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <button onClick={onBack} className="absolute top-6 left-6 z-20 text-text-primary text-3xl leading-none font-bold">&larr;</button>
            <main className="relative z-10 overflow-y-auto p-6 pt-12 pb-8 h-full">
                <div className="text-center mb-8">
                    <h1 className="text-5xl" style={{ fontFamily: '"Lobster", cursive' }}>Create Your Profile</h1>
                    <p className="text-text-secondary mt-2">Join the community to find your next passion.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-text-secondary">Full Name</label>
                            <input type="text" required placeholder="Your Name" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="text-sm text-text-secondary">Username</label>
                            <input type="text" required placeholder="yourusername" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Email</label>
                        <input type="email" required placeholder="your@email.com" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Create Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-text-secondary">City</label>
                            <input type="text" required placeholder="e.g., New York" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                        <div>
                            <label className="text-sm text-text-secondary">State</label>
                            <input type="text" required placeholder="e.g., NY" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Your Favorite Hobby</label>
                        <input type="text" required placeholder="e.g., Photography, Painting" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Short Bio</label>
                        <textarea placeholder="Tell us a little about yourself..." rows={3} className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary-button text-primary-button-text font-bold py-4 rounded-full hover:bg-primary-button-hover transition-colors">
                        Create Account
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateAccountScreen;
