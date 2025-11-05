
// components/AnalyticsWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function AnalyticsWrapper() {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('consent');
        if (consent === 'true') {
            setHasConsent(true);
        }
    }, []);

    if (!hasConsent) {
        return null;
    }

    return <GoogleAnalytics gaId='G-NJQRPRRDG2'/>
}