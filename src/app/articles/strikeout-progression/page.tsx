import { Metadata } from 'next';
import StrikeoutProgContent from "./strikeoutProgContent";


const pageTitle = "Strikeouts - Baseball's Chase for Ineptitude - Probably Baseball"
const pageDescription = "Explore the evolution of baseball’s single-season strikeout record from 1871 to 2023. This data-driven article visualizes how pitchers and hitters have pushed the boundaries of failure and dominance alike, revealing the trends, milestones, and personalities behind baseball’s ever-rising strikeout totals."

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: 'https://probablybaseball.pages.dev/articles/strikeout-progression',
        siteName: 'Probably Baseball',
        // images: [
        //     {
        //         url: 'https://guitartheory.pages.dev/images/logo.png',
        //         width: 221,
        //         height: 68,
        //     },
        // ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: pageTitle,
        description: pageDescription,
        // images: 'https://guitartheory.pages.dev/images/logo.png',
    },
};


export default function ArticlePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article", // Or "Article" / "ScholarlyArticle"
        "headline": "Strikeouts: Baseball's Century-Long Chase for Ineptitude",
        "description": "A deep dive into the evolution of the strikeout in baseball history, from the Dead Ball era to the modern age of Three True Outcomes.",
        "author": {
            "@type": "Person",
            "alternateName": "ProbablyBaseball",
            "name": "Probably Baseball", // Your name here
            "url": "https://probablybaseball.pages.dev/about",
            "jobTitle": "Baseball Data Analyst & Developer"
        },
        "datePublished": "2025-11-11",
        "image": "https://yourbaseballsited.com/images/og-strikeout-history.jpg",
        "publisher": {
        "@type": "Organization",
        "name": "Probably Baseball",
        "logo": {
            "@type": "ImageObject",
            "url": "https://probablybaseball.pages.dev/favicon.ico"
        }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://probablybaseball.pages.dev/articles/strikeout-progression"
        },
        // This part is huge for your Table of Contents
        "hasPart": [
            {
                "@type": "WebPageElement",
                "name": "The Pre-Modern Era (1871–1900)",
                "url": "https://probablybaseball.pages.dev/articles/strikeout-progression#pre-modern"
            },
            {
                "@type": "WebPageElement",
                "name": "The Deadball Era (1900–1919)",
                "url": "probablybaseball.pages.dev/articles/strikeout-progression#deadball"
            }
        ]
    };
    return (
        <div className="font-sans flex flex-col min-w-0 overflow-x-hidden w-full">
            <main className="flex-growx px-6 sm:px-20 py-8 max-w-4xl mx-auto w-full">
                <article className="prose prose-lg w-full break-words">
                    {/* text-gray-200/300/400 */}
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">
                        Strikeouts - Baseballs Chase for Ineptitude
                    </h1>
                    <p className="">By: ProbablyBaseball</p>
                    <p className="mb-8">Published on November 11, 2025</p>

                    <section className="mb-12 text-wrap">
                        <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                            Introduction
                        </span>
                        <h2 className="text-3xl font-semibold mb-3">
                            Becoming The Strikeout King: A History of the K
                        </h2>
                        <p className="text-lg leading-relaxed text-wrap">
                            The year is 1871. The player, Reinder &quot;Rynie&quot; Albertus Wolters, a 27 year-old Dutch standout
                            pitching for the New York Mutuals. That year, Rynie would go on to lead the league in games started,
                            complete games, innings pitched, and tie for first in shutouts with 1. On the offensive side, he would lead the league
                            in RBI&apos;s with 44, while slashing a .370/.412/.543, good enough for an OPS/OPS+ of .956/182. He would also go on
                            to strike out 8 times, leading the league in that category on a team that would only strike out 15 times in 33 games. This
                            feat would set the stage for baseball&apos;s biggest, glorious and most prestigious title, The strikeout king.
                        </p>
                    </section>
                    <nav aria-label="Table of Contents" className="bg-raised p-6 rounded-xl border border-zinc-800 my-8">
                        <h2 className='text-xl font-bold mb-4 text-primary'>Table of Contents</h2>
                        <ul className='space-y-2'>
                            {[
                                { id: "pre-modern", title: "The Pre-Modern Era" },
                                { id: "deadball", title: "The Deadball Era" },
                                { id: "live-ball-golden-age", title: "The Live Ball Era & The Golden Age" },
                                { id: "integration", title: "The Integration Era" },
                                { id: "expansion", title: "The Expansion Era" },
                                { id: "modern-game", title: "The Modern Game" },
                                { id: "epilogue", title: "Epilogue" },
                                { id: "graphs", title: "Statistical Deep Dive" },
                            ].map((item, index) => (
                                <li key={item.id} className="group flex items-baseline gap-3">
                                    <span className="text-xs font-mono text-primary group-hover:text-red-500 transition-colors">
                                        0{index + 1}
                                    </span>
                                    <a 
                                        href={`#${item.id}`} 
                                        className='text-primary hover:text-secondary hover:underline decoration-red-500/50 underline-offset-4 transition-all'
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <StrikeoutProgContent />
                </article>
            </main>

        </div>
    );
}
