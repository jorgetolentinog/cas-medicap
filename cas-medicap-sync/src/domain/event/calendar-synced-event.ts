import { EventBusMessage } from "../ports/EventBus";
import { Calendar } from "../schema/Calendar";
import { uniqueId } from "../service/unique-id";

export function calendarSyncedEvent(calendar: Calendar): EventBusMessage {
  return {
    eventId: uniqueId(),
    eventType: "calendar-synced",
    timestamp: new Date().toISOString(),
    detail: {
      id: calendar.id,
      startDate: calendar.startDate,
      endDate: calendar.endDate,
      isEnabled: calendar.isEnabled,
      companyId: calendar.companyId,
      officeId: calendar.officeId,
      serviceId: calendar.serviceId,
      medicalAreaIds: calendar.medicalAreaIds,
      interestAreaIds: calendar.interestAreaIds,
      professionalId: calendar.professionalId,
      blockDurationInMinutes: calendar.blockDurationInMinutes,
      conditionsOfService: calendar.conditionsOfService,
      days: calendar.days,
      createdAt: calendar.createdAt,
      updatedAt: calendar.updatedAt,
    },
  };
}
