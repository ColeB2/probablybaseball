import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ConsentBanner from "@/components/ConsentBanner/ConsentBanner";
import AnalyticsWrapper from "@/components/AnalyricsWrapper/AnalyticsWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pageTitle = "Probably Baseball"
const pageDescription = "Baseball data, analytics, articles and more. Read up on your favourite topics around the league."

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: 'https://probablybaseball.pages.dev',
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar/>
                {children}
                <Footer/>
                <ConsentBanner/>
                <AnalyticsWrapper/>
            </body>
        </html>
    );
}
