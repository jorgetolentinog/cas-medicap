import { injectable } from "tsyringe";
import { BookingRepository } from "../../domain/repository/BookingRepository";
import { Booking } from "../../domain/schema/Booking";

@injectable()
export class DynamoDBBookingRepository implements BookingRepository {
  create(booking: Booking): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(booking: Booking): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(bookingId: string): Promise<Booking | null> {
    throw new Error("Method not implemented.");
  }
}
