export interface SyncPreBookingRequest {
  id: string
  companyId: string
  officeId: string
  serviceId: string
  professionalId: string
  calendarId: string
  date: string
  blockDurationInMinutes: number
  isEnabled: boolean
}
