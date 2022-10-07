import { z } from 'zod'
import { APIGatewayEvent } from 'aws-lambda'
import { localDate } from '@/domain/service/date'
import { container } from 'tsyringe'
import { SyncException } from '@/domain/usecase/sync-exception/SyncException'

export async function syncExceptionAdapter(event: APIGatewayEvent) {
  const body = bodyParser(event.body ?? '')

  if (!body.success) {
    throw new Error('Invalid request body')
  }

  const startDate = localDate.parse(
    body.data.data.desde,
    'DD/MM/YYYY',
    'YYYY-MM-DD'
  )

  const endDate = localDate.parse(
    body.data.data.hasta,
    'DD/MM/YYYY',
    'YYYY-MM-DD'
  )

  await container.resolve(SyncException).execute({
    id: body.data.data.indice,
    startDate,
    endDate,
    isEnabled: body.data.data.vigencia,
    recurrence: recurrenceParser(body.data.data.recurrencia),
    repeatRecurrenceEvery: body.data.data.repetirCada,
    professionalIds: body.data.data.profesionales,
    serviceIds: body.data.data.servicios,
    dayOfMonth: body.data.data.diaMes ?? undefined,
    weekOfMonth: body.data.data.numeroSemana ?? undefined,
    dayOfWeek: body.data.data.diaSemana ?? undefined,
    days: body.data.data.dias.map((dia) => {
      return {
        dayOfWeek: Number(dia.diaSemana),
        blocks: dia.bloques.map((bloque) => {
          return {
            startTime: bloque[0].padStart(5, '0') + ':00',
            endTime: bloque[1].padStart(5, '0') + ':00'
          }
        })
      }
    })
  })
}

function recurrenceParser(recurrence: string) {
  if (recurrence === 'S') {
    return 'weekly'
  } else if (recurrence === 'M') {
    return 'monthly'
  }

  throw new Error('Recurrence value is unknown')
}

function bodyParser(body: string) {
  const stringify = z
    .string()
    .or(z.number())
    .transform((value) => value.toString())

  const schema = z.object({
    type: z.literal('EXC'),
    data: z.object({
      indice: stringify,
      desde: z.string(),
      hasta: z.string(),
      vigencia: z.boolean(),
      recurrencia: z.string(),
      repetirCada: z.number(),
      profesionales: z.array(stringify),
      servicios: z.array(stringify),
      diaMes: z.number().nullable(),
      diaSemana: z.number().nullable(),
      numeroSemana: z.number().nullable(),
      dias: z.array(
        z.object({
          diaSemana: z.string(),
          bloques: z.array(z.array(z.string()))
        })
      )
    })
  })

  return schema.safeParse(JSON.parse(body))
}
