import { verifyWebhook } from "@clerk/nextjs/webhooks";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        {
          clerkId: evt.data.id,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
        }
      );

      console.log("Response:", data);

      return new Response("Webhook received", { status: 200 });
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
