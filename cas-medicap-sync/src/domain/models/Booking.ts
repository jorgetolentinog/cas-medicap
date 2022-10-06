export class Booking {
  private id: string;
  private date: string;
  private companyId: string;
  private officeId: string;
  private serviceId: string;
  private professionalId: string;
  private patientId: string;
  private calendarId: string;
  private blockDurationInMinutes: number;
  private isEnabled: boolean;
  private createdAt: string;
  private updatedAt: string;

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

  update(props: {
    date: string;
    companyId: string;
    officeId: string;
    serviceId: string;
    professionalId: string;
    patientId: string;
    calendarId: string;
    isEnabled: boolean;
    blockDurationInMinutes: number;
  }) {
    this.date = props.date;
    this.companyId = props.companyId;
    this.officeId = props.officeId;
    this.serviceId = props.serviceId;
    this.professionalId = props.professionalId;
    this.patientId = props.patientId;
    this.calendarId = props.calendarId;
    this.isEnabled = props.isEnabled;
    this.blockDurationInMinutes = props.blockDurationInMinutes;
    this.updatedAt = new Date().toISOString();
  }

  toPrimitives() {
    return {
      id: this.id,
      date: this.date,
      companyId: this.companyId,
      officeId: this.officeId,
      serviceId: this.serviceId,
      professionalId: this.professionalId,
      patientId: this.patientId,
      calendarId: this.calendarId,
      blockDurationInMinutes: this.blockDurationInMinutes,
      isEnabled: this.isEnabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(props: {
    id: string;
    date: string;
    companyId: string;
    officeId: string;
    serviceId: string;
    professionalId: string;
    patientId: string;
    calendarId: string;
    isEnabled: boolean;
    blockDurationInMinutes: number;
  }) {
    return new Booking({
      id: props.id,
      date: props.date,
      companyId: props.companyId,
      officeId: props.officeId,
      serviceId: props.serviceId,
      professionalId: props.professionalId,
      patientId: props.patientId,
      calendarId: props.calendarId,
      isEnabled: props.isEnabled,
      blockDurationInMinutes: props.blockDurationInMinutes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static fromPrimitives(props: {
    id: string;
    date: string;
    companyId: string;
    officeId: string;
    serviceId: string;
    professionalId: string;
    patientId: string;
    calendarId: string;
    isEnabled: boolean;
    blockDurationInMinutes: number;
    createdAt: string;
    updatedAt: string;
  }) {
    return new Booking({
      id: props.id,
      date: props.date,
      companyId: props.companyId,
      officeId: props.officeId,
      serviceId: props.serviceId,
      professionalId: props.professionalId,
      patientId: props.patientId,
      calendarId: props.calendarId,
      blockDurationInMinutes: props.blockDurationInMinutes,
      isEnabled: props.isEnabled,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }
}
