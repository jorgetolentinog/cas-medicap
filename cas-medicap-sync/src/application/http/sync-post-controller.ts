import { z } from "zod";
import { controller } from "./shared/controller";

export const handler = controller(async (event) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  switch (body.data.type) {
    case "LBR": {
      console.log("LBR");
      break;
    }
    case "PSV": {
      console.log("PSV");
      break;
    }
    case "RSV": {
      console.log("RSV");
      break;
    }
    case "CLD": {
      console.log("CLD");
      break;
    }
    case "EXC": {
      console.log("EXC");
      break;
    }
    default: {
      throw new Error("SyncController Invalid Type");
    }
  }

  return {
    statusCode: 204,
    body: '',
  };
});

function bodyParser(body: string) {
  const schema = z.object({
    type: z.string(),
    data: z.record(z.string(), z.any()),
  });

  return schema.safeParse(JSON.parse(body));
}
