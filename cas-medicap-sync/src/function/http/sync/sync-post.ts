import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello from Sync TSx" }),
  };
};