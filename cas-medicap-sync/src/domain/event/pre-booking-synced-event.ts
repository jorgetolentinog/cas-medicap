import { EventBusMessage } from "../ports/EventBus";
import { PreBooking } from "../schema/PreBooking";
import { uniqueId } from "../service/unique-id";

export function preBookingSyncedEvent(preBooking: PreBooking): EventBusMessage {
  return {
    eventId: uniqueId(),
    eventType: "pre-booking-synced",
    timestamp: new Date().toISOString(),
    detail: {
      id: preBooking.id,
      date: preBooking.date,
      companyId: preBooking.companyId,
      officeId: preBooking.officeId,
      serviceId: preBooking.serviceId,
      professionalId: preBooking.professionalId,
      calendarId: preBooking.calendarId,
      blockDurationInMinutes: preBooking.blockDurationInMinutes,
      isEnabled: preBooking.isEnabled,
      createdAt: preBooking.createdAt,
      updatedAt: preBooking.updatedAt,
    },
  };
}
