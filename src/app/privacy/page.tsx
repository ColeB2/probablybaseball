import { EMAIL_ADDRESS } from "@/utils/constants";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Probably Baseball (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) values your privacy. This page
        explains what information we collect, how we use it, and your choices
        as a visitor.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
      <p className="mb-2">We collect only limited, non-personal information:</p>
      <ul className="list-disc list-inside mb-4">
        {/* <li>
          <strong>Functional preferences:</strong> theme settings (dark/light)
          and your cookie consent choice (stored in your browser’s localStorage).
        </li> */}
        <li>
          <strong>Optional analytics (if you accept):</strong> page views,
          referral source, device/browser type, and approximate region.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Information</h2>
      <p className="mb-4">
        We use analytics to understand how visitors use the site and to improve
        content and features. We never sell your data or share personally
        identifiable information with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Third-Party Services</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Google Analytics (only if consent is given):</strong> tracks
          usage data with cookies. See{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Google’s Privacy Policy
          </a>
          .
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Your Choices</h2>
      <ul className="list-disc list-inside mb-4">
        <li>You can accept or decline analytics via our cookie banner.</li>
        <li>
          If declined, Google Analytics will not load.
        </li>
        <li>
          You may reset your choice anytime by clearing your browser’s
          localStorage/cookies.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Contact Us</h2>
      <p className="mb-4">
        If you have questions about this policy, contact us at:{" "}
        <Link href={`mailto:${EMAIL_ADDRESS}`}  className="hover:text-blue-400">Here</Link>
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
    </main>
  );
}