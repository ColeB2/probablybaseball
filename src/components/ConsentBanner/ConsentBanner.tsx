// components/ConsentBanner.tsx
'use client';
import React, { useState, useEffect } from 'react';

const ConsentBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const consent = localStorage.getItem('consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-gray-900 text-sm text-white shadow-lg">
            <span>
                We use cookies (Google Analytics) to improve your experience.{" "}
                <a href="/privacy" className="underline">Learn more</a>
            </span>
            <div className="flex space-x-2">
                <button onClick={handleDecline} className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500">Decline</button>
                <button onClick={handleAccept} className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500">Accept</button>
            </div>
        </div>

    );
};

export default ConsentBanner;