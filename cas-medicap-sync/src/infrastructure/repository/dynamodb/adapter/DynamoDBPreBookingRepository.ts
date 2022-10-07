import { injectable } from "tsyringe";
import { PreBookingRepository } from "@/domain/repository/PreBookingRepository";
import { PreBooking } from "@/domain/schema/PreBooking";

@injectable()
export class DynamoDBPreBookingRepository implements PreBookingRepository {
  create(preBooking: PreBooking): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(preBooking: PreBooking): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(preBookingId: string): Promise<PreBooking | null> {
    throw new Error("Method not implemented.");
  }
}
