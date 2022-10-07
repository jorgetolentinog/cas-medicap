import { ExceptionRepository } from "@/domain/repository/ExceptionRepository";
import { inject, injectable } from "tsyringe";
import { SyncExceptionRequest } from "./SyncExceptionRequest";

@injectable()
export class SyncException {
  constructor(
    @inject("ExceptionRepository")
    private exceptionRepository: ExceptionRepository
  ) {}

  async execute(request: SyncExceptionRequest): Promise<void> {
    let exception = await this.exceptionRepository.findById(request.id);

    if (exception == null) {
      exception = {
        id: request.id,
        startDate: request.startDate,
        endDate: request.endDate,
        isEnabled: request.isEnabled,
        recurrence: request.recurrence,
        repeatRecurrenceEvery: request.repeatRecurrenceEvery,
        professionalIds: request.professionalIds,
        serviceIds: request.serviceIds,
        dayOfMonth: request.dayOfMonth,
        weekOfMonth: request.weekOfMonth,
        dayOfWeek: request.dayOfWeek,
        days: request.days,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.exceptionRepository.create(exception);
    } else {
      exception.startDate = request.startDate;
      exception.endDate = request.endDate;
      exception.isEnabled = request.isEnabled;
      exception.recurrence = request.recurrence;
      exception.repeatRecurrenceEvery = request.repeatRecurrenceEvery;
      exception.professionalIds = request.professionalIds;
      exception.serviceIds = request.serviceIds;
      exception.dayOfMonth = request.dayOfMonth;
      exception.weekOfMonth = request.weekOfMonth;
      exception.dayOfWeek = request.dayOfWeek;
      exception.days = request.days;
      exception.updatedAt = new Date().toISOString();
      await this.exceptionRepository.update(exception);
    }

    console.log("event exception created");
  }
}
