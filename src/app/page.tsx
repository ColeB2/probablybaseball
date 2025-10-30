import ArticleList from "@/components/Articles/Articles";
import { articles } from "./articles/articlesData";

export default function Home() {
  return (
    <main className="font-sans min-h-screen">
        <section className="px-6 sm:px-20 py-2 text-center">
            {/* Hero / Title */}
            <h1 className="text-5xl sm:text-7xl font-bold py-8">
                Probably Baseball
            </h1>
            <p className="text-lg sm:text-2xl text-center">
                Your home for baseball insights, stats, and stories from around the league.
            </p>
            
        </section>
        <ArticleList articles={articles}/>
    </main>
  );
}
