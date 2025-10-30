export const metadata = {
  title: "About | Probably Baseball",
  description:
    "Learn more about Probably Baseball — a data-driven exploration of baseball's history, trends, and stories behind the numbers.",
};

export default function AboutPage() {
  return (
    <main className="font-sans flex flex-col items-center px-6 sm:px-10 py-12 max-w-3xl mx-auto text-gray-100">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-4 text-center">
        About Probably Baseball
      </h1>

      {/* Subtitle */}
      <p className="italic text-gray-400 mb-10 text-center">
        A data-driven look at the strange beauty of baseball statistics.
      </p>

      {/* Body */}
      <section className="space-y-6 leading-relaxed">
        <p>
          <strong>Probably Baseball</strong> explores the history and evolution
          of baseball through numbers, trends, and stories. From early
          19th-century records to modern analytics, the goal is to make sense of
          how the game has changed — and why it still captivates us today.
        </p>

        <p>
          Each article blends visual data, historical context, and statistical
          storytelling. You’ll find deep dives into record progressions, player
          eras, and the quirks that make baseball endlessly fascinating.
        </p>

        <p>
          Whether you’re a fan of sabermetrics or simply curious about how
          strikeouts became an art form, this site aims to make complex trends
          understandable and fun.
        </p>
      </section>

      {/* Divider */}
      <hr className="my-12 border-gray-700 w-full" />

      {/* Credits Section */}
      <section className="text-sm text-gray-400 space-y-3 text-center">
        <h2 className="text-lg font-semibold text-gray-200">Credits</h2>

        {/* <p>
          Data sourced from public baseball databases and historical archives,
          compiled for educational use.
        </p> */}

        <p>
          Page Icon from: 
          <a href="https://www.flaticon.com/free-icons/baseball" title="baseball icons">Baseball icons created by IconKanan - Flaticon</a>
        </p>


        <p className="pt-4 text-gray-500 text-xs">
          © {new Date().getFullYear()} Probably Baseball. All rights reserved.
        </p>
      </section>
    </main>
  );
}
