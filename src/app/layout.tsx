import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolicyForge - Free Privacy Policy & Terms of Service Generator",
  description:
    "Generate professional, customizable legal documents for your website or app. Privacy policies, terms of service, cookie policies, and more. Free to start.",
  keywords: [
    "privacy policy generator",
    "terms of service generator",
    "cookie policy generator",
    "free privacy policy",
    "legal documents",
    "GDPR compliance",
    "website legal pages",
  ],
  verification: {
    google: "5bbD9TgyynvqDqMPtdhrDDpkF0T7x29y4UjNKOp8JOE",
  },
  openGraph: {
    title: "PolicyForge - Free Privacy Policy Generator",
    description:
      "Generate professional legal documents for your website in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
