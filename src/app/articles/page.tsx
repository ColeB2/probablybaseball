import ArticleList from "@/components/Articles.tsx/Articles";
import { articles } from "./articlesData";

// src/app/articles/page.tsx
export default function ArticlesPage() {
  return (
    <main className="font-sans min-h-screen">
      {/* Header */}
      <section className="px-6 sm:px-20 py-2 text-center">
        <h1 className="text-5xl font-bold mb-4">Articles</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Deep dives, stats, and stories from the world of baseball.
        </p>
      </section>
      {/* Article List */}
      <ArticleList articles={articles}/>
    </main>
  );
}
