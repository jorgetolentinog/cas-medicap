import { z } from "zod";
import { APIGatewayEvent } from "aws-lambda";
import { SyncBooking } from "@/domain/usecase/sync-booking/SyncBooking";
import { localDate } from "@/domain/service/date";
import { container } from "@/infrastructure/injection";

export const syncBookingAdapter = async (event: APIGatewayEvent) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  const bookingDate = localDate.parse(
    body.data.data.fecha + " " + body.data.data.hora.padStart(5, "0"),
    "DD/MM/YYYY HH:mm",
    "YYYY-MM-DDTHH:mm:ss"
  );

  await container.resolve(SyncBooking).execute({
    id: body.data.data.indice,
    companyId: body.data.data.codigoEmpresa,
    officeId: body.data.data.codigoSucursal,
    serviceId: body.data.data.codigoServicio,
    professionalId: body.data.data.ppnProfesional,
    calendarId: body.data.data.indiceCalendario,
    patientId: body.data.data.ppnPaciente,
    date: bookingDate,
    blockDurationInMinutes: body.data.data.duracionBloques,
    isEnabled: body.data.data.vigencia,
  });
};

function bodyParser(body: string) {
  const stringify = z
    .string()
    .or(z.number())
    .transform((value) => value.toString());

  const schema = z.object({
    type: z.literal("RSV"),
    data: z.object({
      indice: stringify,
      fecha: z.string(),
      hora: z.string(),
      codigoEmpresa: stringify,
      codigoSucursal: stringify,
      codigoServicio: stringify,
      ppnProfesional: stringify,
      indiceCalendario: stringify,
      ppnPaciente: stringify,
      duracionBloques: z.number(),
      vigencia: z.boolean(),
    }),
  });

  return schema.safeParse(JSON.parse(body));
}
