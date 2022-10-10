import { EventBus, EventBusMessage } from '@/domain/ports/EventBus'

export class MemoryEventBus implements EventBus {
  async publish(message: EventBusMessage): Promise<void> {
    console.log('MemoryEventBus publish', { eventType: message.eventType })
  }
}
