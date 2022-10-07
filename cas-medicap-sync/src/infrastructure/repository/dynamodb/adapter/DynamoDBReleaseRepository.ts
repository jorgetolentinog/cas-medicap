import { injectable } from "tsyringe";
import { ReleaseRepository } from "@/domain/repository/ReleaseRepository";
import { Release } from "@/domain/schema/Release";

@injectable()
export class DynamoDBReleaseRepository implements ReleaseRepository {
  create(release: Release): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(release: Release): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(releaseId: string): Promise<Release | null> {
    throw new Error("Method not implemented.");
  }
}
