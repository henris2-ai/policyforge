import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
  typescript: true,
});

export const PLANS = {
  oneTime: {
    name: "Complete Bundle",
    price: 1900, // $19.00 in cents
    description: "All 5 legal documents, fully customized, lifetime access",
    mode: "payment" as const,
  },
  monthly: {
    name: "Auto-Updating Bundle",
    price: 900, // $9.00 in cents
    description:
      "All documents + auto-updates when laws change, priority support",
    mode: "subscription" as const,
  },
} as const;
