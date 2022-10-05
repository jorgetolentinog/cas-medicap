import "reflect-metadata";

import { APIGatewayEvent } from "aws-lambda";
import { container } from "tsyringe";
import { SyncPostController } from "./controller/SyncPostController";

export const handler = async (event: APIGatewayEvent) => {
  await container.resolve(SyncPostController).execute(event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello from Sync TSx" }),
  };
};
