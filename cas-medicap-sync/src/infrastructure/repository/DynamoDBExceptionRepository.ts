import { injectable } from "tsyringe";
import { ExceptionRepository } from "@/domain/repository/ExceptionRepository";
import { Exception } from "@/domain/schema/Exception";

@injectable()
export class DynamoDBExceptionRepository implements ExceptionRepository {
  create(exception: Exception): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(exception: Exception): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(exceptionId: string): Promise<Exception | null> {
    throw new Error("Method not implemented.");
  }
}
