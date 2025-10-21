export default function ArticlePage() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
        <main className="flex-grow px-6 sm:px-20 py-8 max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-bold mb-4">
                    Strikeouts - Baseballs Chase for Ineptitude
                </h1>
                <p className="">By: Cole</p>
                <p className="mb-8">Published on October 20, 2025</p>

                <p>
                    1871 - Rynie Wolters
                </p>

                <h2>Subheading Example</h2>
                <p>
                    You can use subheadings to break up sections of your article. The layout
                    supports Markdown-style content or rich JSX if you prefer.
                </p>

                <ul>
                    <li>Bullet point 1</li>
                    <li>Bullet point 2</li>
                    <li>Bullet point 3</li>
                </ul>

                <p>
                    Wrap it up with a conclusion or final thought — and that’s your article!
                </p>
            </article>
        </main>

    </div>
  );
}
