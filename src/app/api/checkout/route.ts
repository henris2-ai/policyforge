import { stripe, PLANS } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { plan, email } = await request.json();

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return Response.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (selectedPlan.mode === "subscription") {
      // Create a subscription checkout
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: email || undefined,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `PolicyForge - ${selectedPlan.name}`,
                description: selectedPlan.description,
              },
              unit_amount: selectedPlan.price,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/generate`,
      });

      return Response.json({ url: session.url });
    } else {
      // One-time payment
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: email || undefined,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `PolicyForge - ${selectedPlan.name}`,
                description: selectedPlan.description,
              },
              unit_amount: selectedPlan.price,
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/generate`,
      });

      return Response.json({ url: session.url });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
