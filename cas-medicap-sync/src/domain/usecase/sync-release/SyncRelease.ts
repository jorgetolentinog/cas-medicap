import { releaseSyncedEvent } from '@/domain/event/release-synced-event'
import { EventBus } from '@/domain/ports/EventBus'
import { ReleaseRepository } from '@/domain/repository/ReleaseRepository'
import { inject, injectable } from 'tsyringe'
import { SyncReleaseRequest } from './SyncReleaseRequest'

@injectable()
export class SyncRelease {
  constructor(
    @inject('ReleaseRepository')
    private readonly releaseRepository: ReleaseRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  async execute(request: SyncReleaseRequest): Promise<void> {
    let release = await this.releaseRepository.findById(request.id)

    if (release == null) {
      release = {
        id: request.id,
        date: request.date,
        blockDurationInMinutes: request.blockDurationInMinutes,
        professionalId: request.professionalId,
        serviceId: request.serviceId,
        isEnabled: request.isEnabled,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      await this.releaseRepository.create(release)
    } else {
      release.id = request.id
      release.date = request.date
      release.blockDurationInMinutes = request.blockDurationInMinutes
      release.professionalId = request.professionalId
      release.serviceId = request.serviceId
      release.isEnabled = request.isEnabled
      release.updatedAt = new Date().toISOString()
      await this.releaseRepository.update(release)
    }

    await this.eventBus.publish(releaseSyncedEvent(release))
  }
}
