import { container } from "tsyringe";
import { BookingRepository } from "@/domain/repository/BookingRepository";
import { DynamoDBBookingRepository } from "@/infrastructure/repository/DynamoDBBookingRepository";
import { PreBookingRepository } from "@/domain/repository/PreBookingRepository";
import { DynamoDBPreBookingRepository } from "@/infrastructure/repository/DynamoDBPreBookingRepository";
import { ReleaseRepository } from "@/domain/repository/ReleaseRepository";
import { DynamoDBReleaseRepository } from "@/infrastructure/repository/DynamoDBReleaseRepository";
import { CalendarRepository } from "@/domain/repository/CalendarRepository";
import { DynamoDBCalendarRepository } from "@/infrastructure/repository/DynamoDBCalendarRepository";
import { ExceptionRepository } from "@/domain/repository/ExceptionRepository";
import { DynamoDBExceptionRepository } from "@/infrastructure/repository/DynamoDBExceptionRepository";

container.register<BookingRepository>(
  "BookingRepository",
  DynamoDBBookingRepository
);

container.register<PreBookingRepository>(
  "PreBookingRepository",
  DynamoDBPreBookingRepository
);

container.register<ReleaseRepository>(
  "ReleaseRepository",
  DynamoDBReleaseRepository
);

container.register<CalendarRepository>(
  "CalendarRepository",
  DynamoDBCalendarRepository
);

container.register<ExceptionRepository>(
  "ExceptionRepository",
  DynamoDBExceptionRepository
);

export { container };
