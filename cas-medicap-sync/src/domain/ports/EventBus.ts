export interface EventBus {
  publish(message: EventBusMessage): Promise<void>;
}

export type EventBusMessage = {
  id: string;
  type: string;
  timestamp: string;
  detail: Record<string, unknown>;
};
