import { z } from "zod";
import { httpHandler } from "@/application/shared/http-handler";
import { syncBookingAdapter } from "./sync-booking-adapter";
import { syncPreBookingAdapter } from "./sync-pre-booking-adapter";
import { syncReleaseAdapter } from "./sync-release-adapter";
import { syncCalendarAdapter } from "./sync-calendar-adapter";

export const handler = httpHandler(async (event) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  switch (body.data.type) {
    case "RSV":
      await syncBookingAdapter(event);
      break;
    case "PSV":
      await syncPreBookingAdapter(event);
      break;
    case "LBR":
      await syncReleaseAdapter(event);
      break;
    case "CLD":
      await syncCalendarAdapter(event);
      break;
    default:
      throw new Error("Invalid Type");
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  };
});

function bodyParser(body: string) {
  const schema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()),
  });

  return schema.safeParse(JSON.parse(body));
}
