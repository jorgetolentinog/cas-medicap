import { Booking } from "../../../../models/Booking";
import { BookingRepository } from "../../../../ports/database/BookingRepository";
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
          ":id": {
            S: bookingId,
          },
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

  async create(booking: Booking) {}

  async update(booking: Booking) {}
}
