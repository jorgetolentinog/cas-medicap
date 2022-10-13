import { EventBus, EventBusMessage } from '@/domain/ports/EventBus'
// import EventBridge from 'aws-sdk/clients/eventbridge'
import { AWSType, AWS } from '@/infrastructure/aws'

export class EventBridgeEventBus implements EventBus {
  private readonly _eventBridge: AWSType.EventBridge

  constructor() {
    this._eventBridge = new AWS.EventBridge()
  }

  async publish(message: EventBusMessage): Promise<void> {
    await this._eventBridge
      .putEvents({
        Entries: [
          {
            EventBusName: process.env.EVENT_BUS_NAME,
            Source: process.env.SERVICE_NAME,
            DetailType: message.eventType,
            Time: new Date(message.timestamp),
            Detail: JSON.stringify(message)
          }
        ]
      })
      .promise()
  }
}
