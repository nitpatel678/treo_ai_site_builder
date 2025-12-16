import { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../lib/prisma.js";

export const stripeWebhook = async (request: Request, response: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!endpointSecret) {
    console.error("❌ Missing STRIPE_WEBHOOK_SECRET");
    return response.sendStatus(500);
  }

  const signature = request.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      endpointSecret
    );
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ------------------------------------------------
  // HANDLE EVENTS
  // ------------------------------------------------

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      const { transactionId, appId } = session.metadata || {};

      if (appId !== "ai-site-builder" || !transactionId) {
        console.log("⚠️ Skipping webhook — not for this app");
        break;
      }

      // Fetch transaction
      const transaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: { isPaid: true },
      });

      // Add credits to user!
      await prisma.user.update({
        where: { id: transaction.userId },
        data: { credits: { increment: transaction.credits } },
      });

      console.log("✅ Credits added successfully");
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  response.json({ received: true });
};
