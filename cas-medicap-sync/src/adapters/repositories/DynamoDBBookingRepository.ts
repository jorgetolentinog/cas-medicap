import { Booking } from "../../models/Booking";
import { BookingRepository } from "../../ports/repositories/BookingRepository";
import { DynamoDB } from "../../shared/persistence/DynamoDB";
import { injectable } from "tsyringe";

@injectable()
export class DynamoDBBookingRepository implements BookingRepository {
  private _table = process.env.DYNAMODB_TABLE_BOOKING ?? "BookingTable";

  constructor(private dynamodb: DynamoDB) {}

  async findById(bookingId: string) {
    const result = await this.dynamodb.client.query({
      TableName: this._table,
      KeyConditionExpression: "#id = :id",
      ExpressionAttributeNames: { "#id": "id" },
      ExpressionAttributeValues: {
        ":id": {
          S: bookingId,
        },
      },
    });

    const item = result.Items && result.Items[0];
    if (item == null) {
      return null;
    }

    return new Booking({
      id: item.id.S!,
      date: item.date.S!,
      companyId: item.companyId.S!,
      officeId: item.officeId.S!,
      serviceId: item.serviceId.S!,
      professionalId: item.professionalId.S!,
      patientId: item.patientId.S!,
      calendarId: item.calendarId.S!,
      isEnabled: item.isEnabled.BOOL!,
      blockDurationInMinutes: Number(item.blockDurationInMinutes.N),
      createdAt: item.createdAt.S!,
      updatedAt: item.updatedAt.S!,
    });
  }

  async create(booking: Booking) {}

  async update(booking: Booking) {}
}
