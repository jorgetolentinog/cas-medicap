import { container } from "tsyringe";
import { BookingRepository } from "../../domain/repository/BookingRepository";
import { DynamoDBBookingRepository } from "../repository/DynamoDBBookingRepository";

container.register<BookingRepository>(
  "BookingRepository",
  DynamoDBBookingRepository
);

export { container };
