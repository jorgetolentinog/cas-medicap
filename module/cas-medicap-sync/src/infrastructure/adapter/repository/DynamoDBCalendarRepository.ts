import { injectable } from 'tsyringe'
import { CalendarRepository } from '@/domain/repository/CalendarRepository'
import { Calendar } from '@/domain/schema/Calendar'
import { DynamoDBDocument } from '@/infrastructure/aws/DynamoDBDocument'

@injectable()
export class DynamoDBCalendarRepository implements CalendarRepository {
  private readonly _table = process.env.DYNAMODB_TABLE_MESSAGE ?? 'MessageTable'

  constructor(private readonly dynamodb: DynamoDBDocument) {}

  async create(calendar: Calendar): Promise<void> {
    await this.dynamodb.client
      .put({
        TableName: this._table,
        Item: {
          id: calendar.id,
          startDate: calendar.startDate,
          endDate: calendar.endDate,
          isEnabled: calendar.isEnabled,
          companyId: calendar.companyId,
          officeId: calendar.officeId,
          serviceId: calendar.serviceId,
          medicalAreaIds: calendar.medicalAreaIds,
          interestAreaIds: calendar.interestAreaIds,
          professionalId: calendar.professionalId,
          blockDurationInMinutes: calendar.blockDurationInMinutes,
          conditionsOfService: calendar.conditionsOfService,
          days: calendar.days,
          createdAt: calendar.createdAt,
          updatedAt: calendar.updatedAt,
          // Interno
          _pk: `calendar#${calendar.id}`
        },
        ExpressionAttributeNames: {
          '#_pk': '_pk'
        },
        ConditionExpression: 'attribute_not_exists(#_pk)'
      })
      .promise()
  }

  async update(calendar: Calendar): Promise<void> {
    const attrs = {
      startDate: calendar.startDate,
      endDate: calendar.endDate,
      isEnabled: calendar.isEnabled,
      companyId: calendar.companyId,
      officeId: calendar.officeId,
      serviceId: calendar.serviceId,
      medicalAreaIds: calendar.medicalAreaIds,
      interestAreaIds: calendar.interestAreaIds,
      professionalId: calendar.professionalId,
      blockDurationInMinutes: calendar.blockDurationInMinutes,
      conditionsOfService: calendar.conditionsOfService,
      days: calendar.days,
      createdAt: calendar.createdAt,
      updatedAt: calendar.updatedAt
    }

    let updateExpression = 'set '
    const expressionAttributeNames: Record<string, string> = { '#_pk': '_pk' }
    const expressionAttributeValues: Record<string, unknown> = {}
    for (const prop in attrs) {
      const value = (attrs as Record<string, unknown>)[prop] ?? null
      updateExpression += `#${prop} = :${prop},`
      expressionAttributeNames[`#${prop}`] = prop
      expressionAttributeValues[`:${prop}`] = value
    }
    updateExpression = updateExpression.slice(0, -1)

    await this.dynamodb.client
      .update({
        TableName: this._table,
        Key: {
          _pk: `calendar#${calendar.id}`
        },
        UpdateExpression: updateExpression,
        ConditionExpression: 'attribute_exists(#_pk)',
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      })
      .promise()
  }

  async findById(calendarId: string): Promise<Calendar | null> {
    const result = await this.dynamodb.client
      .query({
        TableName: this._table,
        KeyConditionExpression: '#_pk = :_pk',
        ExpressionAttributeNames: { '#_pk': '_pk' },
        ExpressionAttributeValues: {
          ':_pk': `calendar#${calendarId}`
        }
      })
      .promise()

    const item = result.Items?.[0]
    if (item == null) {
      return null
    }

    return {
      id: item.id,
      startDate: item.startDate,
      endDate: item.endDate,
      isEnabled: item.isEnabled,
      companyId: item.companyId,
      officeId: item.officeId,
      serviceId: item.serviceId,
      medicalAreaIds: item.medicalAreaIds,
      interestAreaIds: item.interestAreaIds,
      professionalId: item.professionalId,
      blockDurationInMinutes: item.blockDurationInMinutes,
      conditionsOfService: item.conditionsOfService,
      days: item.days,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  }
}
