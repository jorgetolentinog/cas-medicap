import { z } from "zod";
import { httpHandler } from "@/application/shared/http-handler";
import { syncBookingAdapter } from "./sync-booking-adapter";

export const handler = httpHandler(async (event) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  if (body.data.type === "RSV") {
    await syncBookingAdapter(event);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  }
});

function bodyParser(body: string) {
  const schema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()),
  });

  return schema.safeParse(JSON.parse(body));
}
