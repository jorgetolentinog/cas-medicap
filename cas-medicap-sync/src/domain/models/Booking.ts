export class Booking {
  id: string;
  date: string;
  companyId: string;
  officeId: string;
  serviceId: string;
  professionalId: string;
  patientId: string;
  calendarId: string;
  blockDurationInMinutes: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(props: {
    id: string;
    date: string;
    companyId: string;
    officeId: string;
    serviceId: string;
    professionalId: string;
    patientId: string;
    calendarId: string;
    blockDurationInMinutes: number;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }) {
    this.id = props.id;
    this.date = props.date;
    this.companyId = props.companyId;
    this.officeId = props.officeId;
    this.serviceId = props.serviceId;
    this.professionalId = props.professionalId;
    this.patientId = props.patientId;
    this.calendarId = props.calendarId;
    this.blockDurationInMinutes = props.blockDurationInMinutes;
    this.isEnabled = props.isEnabled;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
