import { BookingRepository } from "../../repository/BookingRepository";
import { SyncBookingCommand } from "./SyncBookingCommand";

export class SyncBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(command: SyncBookingCommand): Promise<void> {
    let booking = await this.bookingRepository.findById(command.id);

    if (booking == null) {
      booking = {
        id: command.id,
        date: command.date,
        companyId: command.companyId,
        officeId: command.officeId,
        serviceId: command.serviceId,
        professionalId: command.professionalId,
        patientId: command.patientId,
        calendarId: command.calendarId,
        blockDurationInMinutes: command.blockDurationInMinutes,
        isEnabled: command.isEnabled,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.bookingRepository.create(booking);
    } else {
      booking.date = command.date;
      booking.companyId = command.companyId;
      booking.officeId = command.officeId;
      booking.serviceId = command.serviceId;
      booking.professionalId = command.professionalId;
      booking.patientId = command.patientId;
      booking.calendarId = command.calendarId;
      booking.blockDurationInMinutes = command.blockDurationInMinutes;
      booking.isEnabled = command.isEnabled;
      booking.updatedAt = new Date().toISOString();
      await this.bookingRepository.update(booking);
    }

    console.log("event booking created");
  }
}
