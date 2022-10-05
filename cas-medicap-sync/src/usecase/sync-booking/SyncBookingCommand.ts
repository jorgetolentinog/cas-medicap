import { z } from "zod";
import { localDate } from "../../service/date";

export class SyncBookingCommand {
  id: string;
  companyId: string;
  officeId: string;
  serviceId: string;
  professionalId: string;
  calendarId: string;
  patientId: string;
  date: string;
  blockDurationInMinutes: number;
  isEnabled: boolean;

  constructor(request: unknown) {
    const result = this.parse(request);

    if (!result.success) {
      throw new Error("SyncBookingCommand Validation Error");
    }

    const bookingDate = localDate.parse(
      result.data.fecha + " " + result.data.hora.padStart(5, "0"),
      "DD/MM/YYYY HH:mm",
      "YYYY-MM-DDTHH:mm:ss"
    );

    this.id = String(result.data.indice);
    this.companyId = String(result.data.codigoEmpresa);
    this.officeId = String(result.data.codigoSucursal);
    this.serviceId = String(result.data.codigoServicio);
    this.professionalId = String(result.data.ppnProfesional);
    this.calendarId = String(result.data.indiceCalendario);
    this.patientId = String(result.data.ppnPaciente);
    this.date = bookingDate;
    this.blockDurationInMinutes = result.data.duracionBloques;
    this.isEnabled = result.data.vigencia;
  }

  private parse(request: unknown) {
    const schema = z.object({
      indice: z.string().or(z.number()),
      fecha: z.string(),
      hora: z.string(),
      codigoEmpresa: z.string().or(z.number()),
      codigoSucursal: z.string().or(z.number()),
      codigoServicio: z.string().or(z.number()),
      ppnProfesional: z.string().or(z.number()),
      indiceCalendario: z.string().or(z.number()),
      ppnPaciente: z.string().or(z.number()),
      duracionBloques: z.number(),
      vigencia: z.boolean(),
    });

    return schema.safeParse(request);
  }
}
