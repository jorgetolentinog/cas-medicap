import { PreBookingRepository } from "../../repository/PreBookingRepository";
import { SyncPreBookingRequest } from "./SyncPreBookingRequest";

export class SyncPreBooking {
  constructor(private preBookingRepository: PreBookingRepository) {}

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

    console.log("event pre booking created");
  }
}
