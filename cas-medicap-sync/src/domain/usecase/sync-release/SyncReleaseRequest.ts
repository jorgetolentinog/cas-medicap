export interface SyncReleaseRequest {
  id: string;
  date: string;
  blockDurationInMinutes: number;
  professionalId: string;
  serviceId: string;
  isEnabled: boolean;
}
