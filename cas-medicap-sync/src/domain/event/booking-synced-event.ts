import { EventBusMessage } from "../ports/EventBus";
import { Booking } from "../schema/Booking";
import { uniqueId } from "../service/unique-id";

export function bookingSyncedEvent(booking: Booking): EventBusMessage {
  return {
    eventId: uniqueId(),
    eventType: "booking-synced",
    timestamp: new Date().toISOString(),
    detail: {
      id: booking.id,
      date: booking.date,
      companyId: booking.companyId,
      officeId: booking.officeId,
      serviceId: booking.serviceId,
      professionalId: booking.professionalId,
      patientId: booking.patientId,
      calendarId: booking.calendarId,
      blockDurationInMinutes: booking.blockDurationInMinutes,
      isEnabled: booking.isEnabled,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    },
  };
}
