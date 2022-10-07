import { container } from "tsyringe";
import { BookingRepository } from "@/domain/repository/BookingRepository";
import { PreBookingRepository } from "@/domain/repository/PreBookingRepository";
import { ReleaseRepository } from "@/domain/repository/ReleaseRepository";
import { CalendarRepository } from "@/domain/repository/CalendarRepository";
import { ExceptionRepository } from "@/domain/repository/ExceptionRepository";
import { EventBus } from "@/domain/ports/EventBus";
import { DynamoDBBookingRepository } from "@/infrastructure/repository/dynamodb/adapter/DynamoDBBookingRepository";
import { DynamoDBPreBookingRepository } from "@/infrastructure/repository/dynamodb/adapter/DynamoDBPreBookingRepository";
import { DynamoDBReleaseRepository } from "@/infrastructure/repository/dynamodb/adapter/DynamoDBReleaseRepository";
import { DynamoDBCalendarRepository } from "@/infrastructure/repository/dynamodb/adapter/DynamoDBCalendarRepository";
import { DynamoDBExceptionRepository } from "@/infrastructure/repository/dynamodb/adapter/DynamoDBExceptionRepository";
import { MemoryEventBus } from "@/infrastructure/adapter/eventbus/MemoryEventBus";
import { EventBridgeEventBus } from "../adapter/eventbus/EventBridgeEventBus";

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

if (process.env.IS_OFFLINE) {
  container.register<EventBus>("EventBus", MemoryEventBus);
} else {
  container.register<EventBus>("EventBus", EventBridgeEventBus);
}

export { container };
