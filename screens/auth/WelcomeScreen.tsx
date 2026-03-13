
import React from 'react';

interface WelcomeScreenProps {
    onGoToLogin: () => void;
    onGoToCreateAccount: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGoToLogin, onGoToCreateAccount }) => {
    const title = 'Hobbiest';
    return (
        <div className="relative w-full h-full text-white overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=1887&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover animate-zoom-in"
                alt="Camera equipment"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/1887x2831/1a1a1a/ffffff?text=Image+Error'; }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-8 pt-12 pb-24">
                <div className="flex-grow flex flex-col justify-center items-center">
                    <h1 className="text-8xl" style={{ fontFamily: '"Lobster", cursive', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }} aria-label={title}>
                        {title.split('').map((char, index) => (
                            <span
                                key={index}
                                className="inline-block animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <p
                        className="mt-2 text-lg font-light tracking-wider animate-fade-in-up"
                        style={{ animationDelay: `${title.length * 0.05 + 0.2}s` }}
                    >
                        Find your hobby
                    </p>
                </div>
                <div className="w-full max-w-sm space-y-4">
                    <button
                        onClick={onGoToCreateAccount}
                        className="w-full bg-primary-button text-primary-button-text font-semibold py-4 rounded-full shadow-lg hover:bg-primary-button-hover transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${title.length * 0.05 + 0.4}s` }}
                    >
                        Create Account
                    </button>
                    <button
                        onClick={onGoToLogin}
                        className="w-full bg-black text-white border border-gray-500 font-semibold py-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${title.length * 0.05 + 0.5}s` }}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
