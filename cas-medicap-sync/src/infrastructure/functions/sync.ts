import { SyncBookingCommand } from "../../core/usecases/sync-booking/SyncBookingCommand";
// import { syncBooking } from "../injection";

export const handler = async () => {
  // await syncBooking.execute(new SyncBookingCommand({}));
  // new SyncBookingCommand({})

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello from Sync TSx" }),
  };
};
