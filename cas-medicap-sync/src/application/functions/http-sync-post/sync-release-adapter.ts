import { z } from "zod";
import { APIGatewayEvent } from "aws-lambda";
import { localDate } from "@/domain/service/date";
import { container } from "tsyringe";
import { SyncRelease } from "@/domain/usecase/sync-release/SyncRelease";

export async function syncReleaseAdapter(event: APIGatewayEvent) {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  const bookingDate = localDate.parse(
    body.data.data.fecha + " " + body.data.data.hora.padStart(5, "0"),
    "DD/MM/YYYY HH:mm",
    "YYYY-MM-DDTHH:mm:ss"
  );

  await container.resolve(SyncRelease).execute({
    id: body.data.data.indice,
    date: bookingDate,
    blockDurationInMinutes: body.data.data.duracionBloque,
    professionalId: body.data.data.ppnProfesional,
    serviceId: body.data.data.servicio,
    isEnabled: body.data.data.vigencia,
  });
}

function bodyParser(body: string) {
  const stringify = z
    .string()
    .or(z.number())
    .transform((value) => value.toString());

  const schema = z.object({
    type: z.literal("LBR"),
    data: z.object({
      indice: stringify,
      fecha: z.string(),
      hora: z.string(),
      duracionBloque: z.number(),
      ppnProfesional: stringify,
      servicio: z.string(),
      vigencia: z.boolean(),
    }),
  });

  return schema.safeParse(JSON.parse(body));
}
