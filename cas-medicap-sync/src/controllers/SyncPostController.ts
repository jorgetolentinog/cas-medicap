import { APIGatewayEvent } from "aws-lambda";
import { injectable } from "tsyringe";
import { z } from "zod";

@injectable()
export class SyncPostController {
  constructor() {}

  async execute(event: APIGatewayEvent) {
    const result = this.parse(event.body);

    if (!result.success) {
      throw new Error("SyncPostController: Invalid request");
    }

    switch (result.data.type) {
      case "LBR": {
        console.log("LBR");
        break;
      }
      case "PSV": {
        console.log("LBR");
        break;
      }
      case "RSV": {
        console.log("LBR");
        break;
      }
      case "CLD": {
        console.log("LBR");
        break;
      }
      case "EXC": {
        console.log("LBR");
        break;
      }
      default: {
        throw new Error("SyncController Invalid Type");
      }
    }

    return { statusCode: 200, body: "" };
  }

  private parse(body: string | null) {
    const json = JSON.parse(body ?? "");
    const schema = z.object({
      type: z.string(),
      data: z.record(z.string(), z.any()),
    });
    return schema.safeParse(json);
  }
}
