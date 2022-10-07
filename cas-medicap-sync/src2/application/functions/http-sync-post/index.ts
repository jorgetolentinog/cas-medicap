import { z } from "zod";
import { httpHandler } from "../../shared/http-handler";
import { bookingHandler } from "./booking";

export const handler = httpHandler(async (event) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  if (body.data.type === "RSV") {
    return await bookingHandler(event);
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
