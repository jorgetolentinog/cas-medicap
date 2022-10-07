import { z } from "zod";
import { syncBookingController } from "../controller/sync-booking-controller";
import { controller } from "../shared/controller";

export const handler = controller(async (event) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  if (body.data.type === "RSV") {
    return await syncBookingController(event);
  }

  throw new Error("Invalid Type");
});

function bodyParser(body: string) {
  const schema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()),
  });

  return schema.safeParse(JSON.parse(body));
}
