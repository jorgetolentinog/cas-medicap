export interface SyncExceptionRequest {
  id: string;
  startDate: string;
  endDate: string;
  isEnabled: boolean;
  recurrence: "weekly" | "monthly";
  repeatRecurrenceEvery: number;
  professionalIds: string[];
  serviceIds: string[];
  dayOfMonth?: number;
  weekOfMonth?: number;
  dayOfWeek?: number;
  days: {
    dayOfWeek: number;
    blocks: {
      startTime: string;
      endTime: string;
    }[];
  }[];
}
