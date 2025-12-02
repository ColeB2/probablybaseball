'use client';
import Script from 'next/script';
import { useState } from 'react';

export default function GoogleTag({ GA_ID }: { GA_ID: string }) {

    const [consent] = useState<string | null>(
        typeof window !== 'undefined'
            ? localStorage.getItem('consent') === "true" ? 'granted' : 'denied'
            : null
    );


    if (consent === null) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('consent', 'default', {
                    'ad_storage': '${consent}',
                    'ad_user_data': '${consent}',
                    'ad_personalization': '${consent}',
                    'analytics_storage': '${consent}'
                    });
                    gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    });
                `,
                }}
            />
        </>
    );
} 
