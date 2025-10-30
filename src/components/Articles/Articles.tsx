interface Article {
  title: string;
  desc: string;
  href: string;
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <section className="">
        <div className="flex flex-col gap-2 max-w-4xl mx-auto border dark:border-white border-black">
        {articles.map((article, idx) => (
            <a
                key={idx}
                href={article.href}
                className="flex flex-col sm:flex-row gap-6 transition rounded-xl overflow-hidden shadow-sm"
            >

                <div className="flex flex-col justify-center p-6 text-left">
                    <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
                    <p className="mb-4">{article.desc}</p>
                    <span className="text-blue-600 dark:text-blue-300 font-medium hover:underline">
                        Read more →
                    </span>
                </div>
            </a>
        ))}
        </div>
    </section>
);
}
