import { Booking } from "../../models/Booking";
import { BookingRepository } from "../../ports/repositories/BookingRepository";
import { SyncBookingCommand } from "./SyncBookingCommand";

export class SyncBooking {
  constructor(private bookingRepository: BookingRepository) {}

  async execute(command: SyncBookingCommand) {
    let booking = await this.bookingRepository.findById(command.id);

    if (booking != null) {
      booking.update({
        date: booking.date,
        companyId: booking.companyId,
        officeId: booking.officeId,
        serviceId: booking.serviceId,
        professionalId: booking.professionalId,
        patientId: booking.patientId,
        calendarId: booking.calendarId,
        isEnabled: booking.isEnabled,
        blockDurationInMinutes: booking.blockDurationInMinutes,
      });
      await this.bookingRepository.update(booking);
    } else {
      booking = Booking.create({
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
      });
      await this.bookingRepository.create(booking);
    }
  }
}
