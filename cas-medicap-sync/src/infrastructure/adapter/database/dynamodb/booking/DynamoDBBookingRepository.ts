import { Booking } from "../../../../../domain/models/Booking";
import { BookingRepository } from "../../../../../domain/ports/database/BookingRepository";
import { DynamoDB } from "../DynamoDB";
import { injectable } from "tsyringe";

@injectable()
export class DynamoDBBookingRepository implements BookingRepository {
  private _table = process.env.DYNAMODB_TABLE_BOOKING ?? "BookingTable";

  constructor(private dynamodb: DynamoDB) {}

  async findById(bookingId: string) {
    const result = await this.dynamodb.client
      .query({
        TableName: this._table,
        KeyConditionExpression: "#id = :id",
        ExpressionAttributeNames: { "#id": "id" },
        ExpressionAttributeValues: {
          ":id": bookingId,
        },
      })
      .promise();

    const item = result.Items && result.Items[0];
    if (item == null) {
      return null;
    }

    return new Booking({
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
      updatedAt: item.updatedAt,
    });
  }

  async create(booking: Booking) {
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
          isEnabled: booking.isEnabled,
          blockDurationInMinutes: booking.blockDurationInMinutes,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        },
        ConditionExpression: "attribute_not_exists(id)",
      })
      .promise();
  }

  async update(booking: Booking) {
    const item = {
      date: booking.date,
      companyId: booking.companyId,
      officeId: booking.officeId,
      serviceId: booking.serviceId,
      professionalId: booking.professionalId,
      patientId: booking.patientId,
      calendarId: booking.calendarId,
      isEnabled: booking.isEnabled,
      blockDurationInMinutes: booking.blockDurationInMinutes,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    let updateExpression = "set ";
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, unknown> = {};
    for (const prop in item) {
      updateExpression += ` #${prop} = :${prop},`;
      expressionAttributeNames[`#${prop}`] = prop;
      expressionAttributeValues[`:${prop}`] = (item as Record<string, unknown>)[
        prop
      ];
    }
    updateExpression = updateExpression.slice(0, -1);

    await this.dynamodb.client
      .update({
        TableName: this._table,
        Key: {
          id: booking.id,
        },
        UpdateExpression: updateExpression,
        ConditionExpression: "attribute_exists(id) and #updatedAt < :updatedAt",
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      })
      .promise();
  }
}
