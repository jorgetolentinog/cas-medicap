import { SyncBooking } from "../../core/usecases/sync-booking/SyncBooking";
import { DynamoDBBookingRepository } from "../adapters/repositories/DynamoDBBookingRepository";
import { DynamoDB } from "../persistence/DynamoDB";

const dynamodb = new DynamoDB();

const dynamodbBookingRepository = new DynamoDBBookingRepository(dynamodb);

const syncBooking = new SyncBooking(dynamodbBookingRepository);

export { syncBooking };
