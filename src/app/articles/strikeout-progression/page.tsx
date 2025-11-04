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
    return (
        <div className="font-sans flex flex-col min-w-0 overflow-x-hidden w-full">
            <main className="flex-growx px-6 sm:px-20 py-8 max-w-4xl mx-auto w-full">
                <article className="prose prose-lg w-full break-words">
                    {/* text-gray-200/300/400 */}
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">
                        Strikeouts - Baseballs Chase for Ineptitude
                    </h1>
                    <p className="">By: ProbablyBaseball</p>
                    <p className="mb-8">Published on October 20, 2025</p>

                    <section className="mb-12 text-wrap">
                        <h2 className="text-2xl font-semibold mb-3">
                            Introduction - The Strikeout King
                        </h2>
                        <p className="text-lg leading-relaxed text-wrap">
                            The year is 1871. The player, Reinder &quot;Rynie&quot; Albertus Wolters, a 27 year-old Dutch standout
                            pitching for the New York Mutuals. That year Rynie would go on to lead the league in games started,
                            complete games, innings pitched, and tie for first in shutouts with 1. On the offensive side he would lead the league
                            in RBI&apos;s with 44, while slashing a .370/.412/.543, good enough for an OPS/OPS+ of .956/182. He would also go on
                            to strikeout 8 times, leading the league in that category on a team that would only strikeout 15 times in 33 games. This
                            feat would set the stage for baseballs biggest, glorious and most prestigous title, The strikeout king.
                        </p>
                    </section>
                    <div id="toc">
                    <h2 className='text-lg'>Table of Contents</h2>
                        <ul className='mx-6 text-md mb-12'>
                            <li><a href="#chapter1">Chapter 1 - The Pre Modern Era</a></li>
                            <li><a href="#chapter2">Chapter 2 - The Deadball Era </a></li>
                            <li><a href="#chapter3">Chapter 3 - The Live Ball Era and The Golden Age</a></li>
                            <li><a href="#chapter4">Chapter 4 - The Integration Era</a></li>
                            <li><a href="#chapter5">Chapter 5 - The &quot;Expansion&quot; Era</a></li>
                            <li><a href="#chapter6">Chapter 6 - The Modern Game - Three True Outcomes</a></li>
                            <li><a href="#epilogue">Epilogue - The End </a></li>
                            <li><a href="#graphs">The Graphs</a></li>
                        </ul>
                    </div>
                    <StrikeoutProgContent />
                </article>
            </main>

        </div>
    );
}
