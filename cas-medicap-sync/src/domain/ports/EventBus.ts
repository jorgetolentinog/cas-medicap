export interface EventBus {
  publish(message: EventBusMessage): Promise<void>;
}

export type EventBusMessage = {
  eventId: string;
  eventType: string;
  timestamp: string;
  detail: Record<string, unknown>;
};
