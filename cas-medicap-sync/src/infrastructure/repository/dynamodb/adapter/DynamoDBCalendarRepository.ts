import { injectable } from "tsyringe";
import { CalendarRepository } from "@/domain/repository/CalendarRepository";
import { Calendar } from "@/domain/schema/Calendar";

@injectable()
export class DynamoDBCalendarRepository implements CalendarRepository {
  create(calendar: Calendar): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(calendar: Calendar): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(calendarId: string): Promise<Calendar | null> {
    throw new Error("Method not implemented.");
  }
}
