import { CalendarRepository } from "@/domain/repository/CalendarRepository";
import { SyncCalendarRequest } from "./SyncCalendarRequest";

export class SyncCalendar {
  constructor(private calendarRepository: CalendarRepository) {}

  async execute(request: SyncCalendarRequest): Promise<void> {
    let calendar = await this.calendarRepository.findById(request.id);

    if (calendar == null) {
      calendar = {
        id: request.id,
        startDate: request.startDate,
        endDate: request.endDate,
        isEnabled: request.isEnabled,
        companyId: request.companyId,
        officeId: request.officeId,
        serviceId: request.serviceId,
        medicalAreaIds: request.medicalAreaIds,
        interestAreaIds: request.interestAreaIds,
        professionalId: request.professionalId,
        blockDurationInMinutes: request.blockDurationInMinutes,
        conditionsOfService: request.conditionsOfService,
        days: request.days,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.calendarRepository.create(calendar);
    } else {
      calendar.startDate = request.startDate;
      calendar.endDate = request.endDate;
      calendar.isEnabled = request.isEnabled;
      calendar.companyId = request.companyId;
      calendar.officeId = request.officeId;
      calendar.serviceId = request.serviceId;
      calendar.medicalAreaIds = request.medicalAreaIds;
      calendar.interestAreaIds = request.interestAreaIds;
      calendar.professionalId = request.professionalId;
      calendar.blockDurationInMinutes = request.blockDurationInMinutes;
      calendar.conditionsOfService = request.conditionsOfService;
      calendar.days = request.days;
      calendar.updatedAt = new Date().toISOString();
      await this.calendarRepository.update(calendar);
    }

    console.log("event calendar created");
  }
}
