import { injectable } from 'tsyringe'
import { ReleaseRepository } from '@/domain/repository/ReleaseRepository'
import { Release } from '@/domain/schema/Release'
import { DynamoDBDocument } from '@/infrastructure/aws/DynamoDBDocument'

@injectable()
export class DynamoDBReleaseRepository implements ReleaseRepository {
  private readonly _table = process.env.DYNAMODB_TABLE_MESSAGE ?? 'MessageTable'

  constructor(private readonly dynamodb: DynamoDBDocument) {}

  async create(release: Release): Promise<void> {
    await this.dynamodb.client
      .put({
        TableName: this._table,
        Item: {
          id: release.id,
          date: release.date,
          blockDurationInMinutes: release.blockDurationInMinutes,
          professionalId: release.professionalId,
          serviceId: release.serviceId,
          isEnabled: release.isEnabled,
          createdAt: release.createdAt,
          updatedAt: release.updatedAt,
          // Interno
          _pk: `release#${release.id}`
        },
        ExpressionAttributeNames: {
          '#_pk': '_pk'
        },
        ConditionExpression: 'attribute_not_exists(#_pk)'
      })
      .promise()
  }

  async update(release: Release): Promise<void> {
    const attrs = {
      date: release.date,
      blockDurationInMinutes: release.blockDurationInMinutes,
      professionalId: release.professionalId,
      serviceId: release.serviceId,
      isEnabled: release.isEnabled,
      createdAt: release.createdAt,
      updatedAt: release.updatedAt
    }

    let updateExpression = 'set '
    const expressionAttributeNames: Record<string, string> = { '#_pk': '_pk' }
    const expressionAttributeValues: Record<string, unknown> = {}

    for (const prop in attrs) {
      const value = (attrs as Record<string, unknown>)[prop] ?? null
      updateExpression += `#${prop} = :${prop},`
      expressionAttributeNames[`#${prop}`] = prop
      expressionAttributeValues[`:${prop}`] = value
    }
    updateExpression = updateExpression.slice(0, -1)

    await this.dynamodb.client
      .update({
        TableName: this._table,
        Key: {
          _pk: `release#${release.id}`
        },
        UpdateExpression: updateExpression,
        ConditionExpression: 'attribute_exists(#_pk)',
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      })
      .promise()
  }

  async findById(releaseId: string): Promise<Release | null> {
    const result = await this.dynamodb.client
      .query({
        TableName: this._table,
        KeyConditionExpression: '#_pk = :_pk',
        ExpressionAttributeNames: { '#_pk': '_pk' },
        ExpressionAttributeValues: {
          ':_pk': `release#${releaseId}`
        }
      })
      .promise()

    const item = result.Items?.[0]
    if (item == null) {
      return null
    }

    return {
      id: item.id,
      date: item.date,
      blockDurationInMinutes: item.blockDurationInMinutes,
      professionalId: item.professionalId,
      serviceId: item.serviceId,
      isEnabled: item.isEnabled,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  }
}
