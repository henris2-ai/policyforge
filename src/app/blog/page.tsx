import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PolicyForge Blog - Legal Compliance Guides for Website Owners",
  description:
    "Expert guides on privacy policies, GDPR compliance, and legal requirements for websites. Learn how to protect your business and users.",
};

const posts = [
  {
    title: "How to Write a Privacy Policy for Your Website (2026 Guide)",
    slug: "privacy-policy-guide",
    excerpt:
      "A comprehensive step-by-step guide to creating a privacy policy that covers GDPR, CCPA, and other major regulations. Everything you need to know to protect your website and your users.",
    date: "April 1, 2026",
    readingTime: "10 min read",
  },
  {
    title: "Do I Need a Privacy Policy? A Simple Answer for Every Website",
    slug: "do-i-need-a-privacy-policy",
    excerpt:
      "If you collect any data at all, the answer is almost certainly yes. Learn what counts as data collection, which laws apply to you, and what happens if you skip it.",
    date: "March 25, 2026",
    readingTime: "7 min read",
  },
  {
    title: "GDPR Compliance Checklist: 10 Steps for Website Owners",
    slug: "gdpr-compliance-checklist",
    excerpt:
      "A practical, actionable checklist to make your website GDPR-compliant. From data audits to cookie consent banners, cover every requirement step by step.",
    date: "March 18, 2026",
    readingTime: "12 min read",
  },
];

export default function BlogIndex() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          PolicyForge Blog
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Legal compliance guides for website owners
        </p>
      </div>

      {/* Post Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <time>{post.date}</time>
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold leading-snug text-gray-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-indigo-600"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Read more
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="mt-16 rounded-2xl bg-indigo-600 px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Generate your privacy policy in minutes
        </h2>
        <p className="mt-3 text-indigo-100">
          Answer a few questions about your website and get a professionally
          drafted, legally compliant privacy policy — free.
        </p>
        <Link
          href="/generate"
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-indigo-600 shadow transition-all hover:bg-indigo-50 hover:shadow-lg"
        >
          Generate Your Free Policy
        </Link>
      </div>
    </div>
  );
}
