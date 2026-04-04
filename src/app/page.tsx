import Link from "next/link";

const features = [
  {
    emoji: "🛡️",
    title: "Legally Compliant",
    description:
      "Documents follow GDPR, CCPA, CalOPPA, and other major regulations so you stay protected worldwide.",
  },
  {
    emoji: "✏️",
    title: "Customizable",
    description:
      "Tailored to your specific business, data practices, and industry — not a one-size-fits-all template.",
  },
  {
    emoji: "📄",
    title: "Multiple Formats",
    description:
      "Download as clean HTML, Markdown, or plain text ready to paste directly into your site.",
  },
  {
    emoji: "🔄",
    title: "Auto-Updating",
    description:
      "Policies stay current as privacy laws evolve. Never worry about outdated legal language again.",
  },
  {
    emoji: "📋",
    title: "5 Document Types",
    description:
      "Privacy Policy, Terms of Service, Cookie Policy, Disclaimer, and Refund Policy — all covered.",
  },
  {
    emoji: "🆓",
    title: "Free to Start",
    description:
      "Generate your first privacy policy at no cost. No credit card required, no strings attached.",
  },
];

const steps = [
  {
    number: "1",
    title: "Answer a Few Questions",
    description:
      "Tell us about your business, what data you collect, and how you use it. Takes under 5 minutes.",
  },
  {
    number: "2",
    title: "We Generate Your Documents",
    description:
      "Our AI creates customized, legally compliant documents tailored to your specific needs.",
  },
  {
    number: "3",
    title: "Download and Publish",
    description:
      "Get your documents in your preferred format and add them to your website immediately.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for getting started",
    features: [
      "1 basic privacy policy",
      "Standard template",
      "HTML download",
      "Basic customization",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "One-Time",
    price: "$19",
    period: "one-time",
    description: "Best value for most websites",
    features: [
      "All 5 document types",
      "Fully customized to your business",
      "HTML, Markdown, and plain text",
      "Lifetime access to documents",
      "Unlimited revisions",
    ],
    cta: "Generate All Documents",
    highlighted: true,
  },
  {
    name: "Monthly",
    price: "$9",
    period: "/mo",
    description: "For businesses that need to stay current",
    features: [
      "Everything in One-Time",
      "Auto-updates when laws change",
      "Priority email support",
      "Compliance alerts",
      "Multi-site license",
    ],
    cta: "Start Monthly Plan",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Are these documents actually legally valid?",
    answer:
      "Yes. Our documents are drafted based on current legal requirements for GDPR, CCPA, CalOPPA, and other major regulations. While we recommend having an attorney review any legal document for your specific situation, thousands of businesses rely on PolicyForge-generated documents for their compliance needs.",
  },
  {
    question: "How is this different from free policy generators?",
    answer:
      "Most free generators produce generic, copy-paste templates that may not cover your specific business practices. PolicyForge uses AI to ask targeted questions about your data collection, third-party services, and business model to create documents that accurately reflect what your business actually does.",
  },
  {
    question: "Can I edit the documents after they are generated?",
    answer:
      "Absolutely. You own the documents once they are generated. You can edit them however you like, add custom clauses, or have your attorney modify them. We provide them in editable formats specifically for this purpose.",
  },
  {
    question: "What happens if privacy laws change?",
    answer:
      "If you are on the Monthly plan, we automatically update your documents when relevant laws change and notify you. One-Time and Free users can regenerate their documents at any time, but will not receive automatic updates or alerts.",
  },
  {
    question: "Do I need a privacy policy for my website?",
    answer:
      "In most cases, yes. If your website collects any personal data — including through analytics tools, contact forms, cookies, or email signups — regulations like GDPR and CCPA require you to have a privacy policy. Many ad networks and app stores also require one.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            PolicyForge
          </Link>
          <Link
            href="/generate"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Generate Free Policy
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Professional Legal Documents for Your Website{" "}
            <span className="text-indigo-600">— In Minutes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Generate privacy policies, terms of service, and more with AI that
            understands your business. Legally compliant, fully customized, and
            ready to publish.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/generate"
              className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200"
            >
              Generate Your Free Policy
            </Link>
            <span className="text-sm text-gray-500">
              No credit card required
            </span>
          </div>
          <p className="mt-12 text-sm font-medium text-gray-400">
            Trusted by 10,000+ websites and apps worldwide
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Everything You Need for Legal Compliance
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Stop worrying about legal requirements. We handle the complexity so
              you can focus on your business.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="text-3xl">{feature.emoji}</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-indigo-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to professional legal documents.
            </p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/generate"
              className="inline-block rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl"
            >
              Start Generating Now
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free. Upgrade when you need more.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-indigo-600 bg-white shadow-xl shadow-indigo-100 ring-1 ring-indigo-600"
                    : "border-gray-200 bg-white"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm text-gray-500">
                        {tier.period}
                      </span>
                    )}
                  </div>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/generate"
                  className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-50 text-gray-900 ring-1 ring-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-8">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 px-6 py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Get Compliant?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Join thousands of websites using PolicyForge to handle their legal
            documents. Start with a free privacy policy today.
          </p>
          <Link
            href="/generate"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
          >
            Generate Your Free Policy
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PolicyForge. All rights reserved.
          </div>
          <nav className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
