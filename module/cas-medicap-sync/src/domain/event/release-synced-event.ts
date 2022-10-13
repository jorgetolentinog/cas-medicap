import { EventBusMessage } from '../ports/EventBus'
import { Release } from '../schema/Release'
import { uniqueId } from '../service/unique-id'

export function releaseSyncedEvent(release: Release): EventBusMessage {
  return {
    eventId: uniqueId(),
    eventType: 'release.synced',
    timestamp: new Date().toISOString(),
    body: {
      id: release.id,
      date: release.date,
      blockDurationInMinutes: release.blockDurationInMinutes,
      professionalId: release.professionalId,
      serviceId: release.serviceId,
      isEnabled: release.isEnabled,
      createdAt: release.createdAt,
      updatedAt: release.updatedAt
    }
  }
}
