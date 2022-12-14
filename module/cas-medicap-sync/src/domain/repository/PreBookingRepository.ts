import { PreBooking } from '../schema/PreBooking'

export interface PreBookingRepository {
  create: (preBooking: PreBooking) => Promise<void>
  update: (preBooking: PreBooking) => Promise<void>
  findById: (preBookingId: string) => Promise<PreBooking | null>
}
