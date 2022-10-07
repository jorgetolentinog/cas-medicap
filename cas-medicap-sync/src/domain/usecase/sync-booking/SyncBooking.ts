import { inject, injectable } from "tsyringe";
import { BookingRepository } from "../../repository/BookingRepository";
import { SyncBookingRequest } from "./SyncBookingRequest";

@injectable()
export class SyncBooking {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: BookingRepository
  ) {}

  async execute(request: SyncBookingRequest): Promise<void> {
    let booking = await this.bookingRepository.findById(request.id);

    if (booking == null) {
      booking = {
        id: request.id,
        date: request.date,
        companyId: request.companyId,
        officeId: request.officeId,
        serviceId: request.serviceId,
        professionalId: request.professionalId,
        patientId: request.patientId,
        calendarId: request.calendarId,
        blockDurationInMinutes: request.blockDurationInMinutes,
        isEnabled: request.isEnabled,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.bookingRepository.create(booking);
    } else {
      booking.date = request.date;
      booking.companyId = request.companyId;
      booking.officeId = request.officeId;
      booking.serviceId = request.serviceId;
      booking.professionalId = request.professionalId;
      booking.patientId = request.patientId;
      booking.calendarId = request.calendarId;
      booking.blockDurationInMinutes = request.blockDurationInMinutes;
      booking.isEnabled = request.isEnabled;
      booking.updatedAt = new Date().toISOString();
      await this.bookingRepository.update(booking);
    }

    console.log("event booking created");
  }
}
