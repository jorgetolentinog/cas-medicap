export interface SyncBookingRequest {
  id: string
  companyId: string
  officeId: string
  serviceId: string
  professionalId: string
  calendarId: string
  patientId: string
  date: string
  blockDurationInMinutes: number
  isEnabled: boolean
}
