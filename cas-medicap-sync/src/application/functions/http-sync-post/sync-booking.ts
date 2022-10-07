import { z } from "zod";
import { httpHandler } from "../../shared/http-handler";

export const syncBookingHandler = httpHandler(async (event) => {
  const body = bodyParser(event.body ?? "");

  if (!body.success) {
    throw new Error("Invalid request body");
  }

  return {
    statusCode: 204,
    body: "",
  };
});

function bodyParser(body: string) {
  const schema = z.object({
    type: z.string(),
    data: z.object({
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
    }),
  });

  return schema.safeParse(JSON.parse(body));
}
