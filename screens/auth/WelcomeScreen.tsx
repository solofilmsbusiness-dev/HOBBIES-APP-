
import React from 'react';

interface WelcomeScreenProps {
    onGoToLogin: () => void;
    onGoToCreateAccount: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGoToLogin, onGoToCreateAccount }) => {
    return (
        <div className="relative w-full h-full text-white overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=1887&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover animate-zoom-in"
                alt="Camera equipment"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/1887x2831/1a1a1a/ffffff?text=Image+Error'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            <div className="absolute top-14 right-6 w-2.5 h-2.5 rounded-full bg-accent opacity-70 animate-neon-pulse" />
            <div className="relative z-10 flex flex-col h-full px-8 pt-16 pb-10">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <span className="badge-pill">Find Your Passion</span>
                </div>
                <div className="flex-grow flex flex-col justify-end pb-8">
                    <h1
                        className="text-7xl font-black leading-none tracking-tight animate-fade-in-up"
                        style={{ fontFamily: '"Inter", sans-serif', animationDelay: '0.2s' }}
                    >
                        Hob<span className="text-accent">biest</span>
                    </h1>
                    <p
                        className="mt-4 text-base font-light text-gray-300 leading-relaxed max-w-xs animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                        Discover hobbies, find your people,{'\n'}build the life you actually want.
                    </p>
                </div>
                <div className="w-full space-y-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <button
                        onClick={onGoToCreateAccount}
                        className="w-full bg-primary-button text-primary-button-text font-bold py-4 rounded-2xl neon-glow hover:bg-primary-button-hover transition-all"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={onGoToLogin}
                        className="w-full bg-white/5 text-gray-300 border border-white/10 font-medium py-4 rounded-2xl hover:bg-white/10 transition-all"
                    >
                        I already have an account
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                        By continuing you agree to our Terms & Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
