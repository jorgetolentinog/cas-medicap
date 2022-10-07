import { z } from 'zod'
import { APIGatewayEvent } from 'aws-lambda'
import { localDate } from '@/domain/service/date'
import { container } from 'tsyringe'
import { SyncCalendar } from '@/domain/usecase/sync-calendar/SyncCalendar'

export async function syncCalendarAdapter(event: APIGatewayEvent) {
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

  const minAge = conditionalAgeParser(
    body.data.data.condicionesAtencionServicio.edadMinimaAtencion
  )
  const maxAge = conditionalAgeParser(
    body.data.data.condicionesAtencionServicio.edadMaximaAtencion
  )
  const gender = genderParser(
    body.data.data.condicionesAtencionServicio.generoAtencion
  )

  await container.resolve(SyncCalendar).execute({
    id: body.data.data.indice,
    startDate,
    endDate,
    isEnabled: body.data.data.vigencia,
    companyId: body.data.data.codigoEmpresa,
    officeId: body.data.data.codigoSucursal,
    serviceId: body.data.data.codigoServicio,
    medicalAreaIds: body.data.data.codigosAreasMedicas,
    interestAreaIds: body.data.data.codigosAreasDeInteres,
    professionalId: body.data.data.ppnProfesional,
    blockDurationInMinutes: body.data.data.duracionBloques,
    conditionsOfService: {
      minAge,
      maxAge,
      gender
    },
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

function genderParser(gender: string) {
  if (gender !== 'F' && gender !== 'M') {
    return undefined
  }
  return gender
}

function conditionalAgeParser(age: string) {
  const numAge = Number(age)
  if (isNaN(numAge)) {
    return undefined
  }

  if (numAge < 0) {
    return undefined
  }

  return numAge
}

function bodyParser(body: string) {
  const stringify = z
    .string()
    .or(z.number())
    .transform((value) => value.toString())

  const schema = z.object({
    type: z.literal('CLD'),
    data: z.object({
      indice: stringify,
      desde: z.string(),
      hasta: z.string(),
      codigoEmpresa: stringify,
      codigoSucursal: stringify,
      codigoServicio: stringify,
      ppnProfesional: stringify,
      vigencia: z.boolean(),
      codigosAreasMedicas: z.array(z.string()),
      codigosAreasDeInteres: z.array(z.string()),
      duracionBloques: z.number(),
      condicionesAtencionServicio: z.object({
        edadMaximaAtencion: stringify,
        edadMinimaAtencion: stringify,
        generoAtencion: z.string()
      }),
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
