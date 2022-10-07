import { EventBusMessage } from '../ports/EventBus'
import { Exception } from '../schema/Exception'
import { uniqueId } from '../service/unique-id'

export function exceptionSyncedEvent(exception: Exception): EventBusMessage {
  return {
    eventId: uniqueId(),
    eventType: 'exception-synced',
    timestamp: new Date().toISOString(),
    detail: {
      id: exception.id,
      startDate: exception.startDate,
      endDate: exception.endDate,
      isEnabled: exception.isEnabled,
      recurrence: exception.recurrence,
      repeatRecurrenceEvery: exception.repeatRecurrenceEvery,
      professionalIds: exception.professionalIds,
      serviceIds: exception.serviceIds,
      dayOfMonth: exception.dayOfMonth,
      weekOfMonth: exception.weekOfMonth,
      dayOfWeek: exception.dayOfWeek,
      days: exception.days,
      createdAt: exception.createdAt,
      updatedAt: exception.updatedAt
    }
  }
}
