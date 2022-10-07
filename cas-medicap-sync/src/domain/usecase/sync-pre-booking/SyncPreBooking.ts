import { preBookingSyncedEvent } from "@/domain/event/pre-booking-synced-event";
import { EventBus } from "@/domain/ports/EventBus";
import { PreBookingRepository } from "@/domain/repository/PreBookingRepository";
import { inject, injectable } from "tsyringe";
import { SyncPreBookingRequest } from "./SyncPreBookingRequest";

@injectable()
export class SyncPreBooking {
  constructor(
    @inject("PreBookingRepository")
    private preBookingRepository: PreBookingRepository,

    @inject("EventBus")
    private eventBus: EventBus
  ) {}

  async execute(request: SyncPreBookingRequest): Promise<void> {
    let preBooking = await this.preBookingRepository.findById(request.id);

    if (preBooking == null) {
      preBooking = {
        id: request.id,
        date: request.date,
        companyId: request.companyId,
        officeId: request.officeId,
        serviceId: request.serviceId,
        professionalId: request.professionalId,
        calendarId: request.calendarId,
        blockDurationInMinutes: request.blockDurationInMinutes,
        isEnabled: request.isEnabled,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.preBookingRepository.create(preBooking);
    } else {
      preBooking.date = request.date;
      preBooking.companyId = request.companyId;
      preBooking.officeId = request.officeId;
      preBooking.serviceId = request.serviceId;
      preBooking.professionalId = request.professionalId;
      preBooking.calendarId = request.calendarId;
      preBooking.blockDurationInMinutes = request.blockDurationInMinutes;
      preBooking.isEnabled = request.isEnabled;
      preBooking.updatedAt = new Date().toISOString();
      await this.preBookingRepository.update(preBooking);
    }

    await this.eventBus.publish(preBookingSyncedEvent(preBooking));
  }
}
