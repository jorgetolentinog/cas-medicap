export interface EventBus {
  publish: (message: EventBusMessage) => Promise<void>
}

export interface EventBusMessage {
  eventId: string
  eventType: string
  timestamp: string
  detail: Record<string, unknown>
}
