import { injectable } from 'tsyringe'
import { BookingRepository } from '@/domain/repository/BookingRepository'
import { Booking } from '@/domain/schema/Booking'
import { DynamoDB } from '../DynamoDB'

@injectable()
export class DynamoDBBookingRepository implements BookingRepository {
  private readonly _table = process.env.DYNAMODB_TABLE_BOOKING ?? 'BookingTable'

  constructor(private readonly dynamodb: DynamoDB) {}

  async create(booking: Booking): Promise<void> {
    await this.dynamodb.client
      .put({
        TableName: this._table,
        Item: {
          id: booking.id,
          date: booking.date,
          companyId: booking.companyId,
          officeId: booking.officeId,
          serviceId: booking.serviceId,
          professionalId: booking.professionalId,
          patientId: booking.patientId,
          calendarId: booking.calendarId,
          blockDurationInMinutes: booking.blockDurationInMinutes,
          isEnabled: booking.isEnabled,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt
        },
        ConditionExpression: 'attribute_not_exists(id)'
      })
      .promise()
  }

  async update(booking: Booking): Promise<void> {
    const attrs = {
      date: booking.date,
      companyId: booking.companyId,
      officeId: booking.officeId,
      serviceId: booking.serviceId,
      professionalId: booking.professionalId,
      patientId: booking.patientId,
      calendarId: booking.calendarId,
      blockDurationInMinutes: booking.blockDurationInMinutes,
      isEnabled: booking.isEnabled,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }

    let updateExpression = 'set '
    const expressionAttributeNames: Record<string, string> = {}
    const expressionAttributeValues: Record<string, unknown> = {}
    for (const prop in attrs) {
      updateExpression += ` #${prop} = :${prop},`
      expressionAttributeNames[`#${prop}`] = prop
      expressionAttributeValues[`:${prop}`] = (
        attrs as Record<string, unknown>
      )[prop]
    }
    updateExpression = updateExpression.slice(0, -1)

    await this.dynamodb.client
      .update({
        TableName: this._table,
        Key: {
          id: booking.id
        },
        UpdateExpression: updateExpression,
        ConditionExpression: 'attribute_exists(id)',
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      })
      .promise()
  }

  async findById(bookingId: string): Promise<Booking | null> {
    const result = await this.dynamodb.client
      .query({
        TableName: this._table,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeNames: { '#id': 'id' },
        ExpressionAttributeValues: {
          ':id': bookingId
        }
      })
      .promise()

    const item = result.Items != null && result.Items[0]
    if (item == null) {
      return null
    }

    return {
      id: item.id,
      date: item.date,
      companyId: item.companyId,
      officeId: item.officeId,
      serviceId: item.serviceId,
      professionalId: item.professionalId,
      patientId: item.patientId,
      calendarId: item.calendarId,
      isEnabled: item.isEnabled,
      blockDurationInMinutes: item.blockDurationInMinutes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  }
}
