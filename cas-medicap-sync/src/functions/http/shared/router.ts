import UrlPattern from 'url-pattern'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from '@/module/shared/domain/service/logger'
import { safeStringify } from '@/module/shared/domain/service/safe-stringify'
import { ValidationError } from '@/module/shared/domain/errors/ValidationError'

export function router(routes: HttpRoute[]) {
  return async (event: APIGatewayEvent, context: Context) => {
    const response = await pathResponse(event, context)
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      ...response
    }
  }

  async function pathResponse(event: APIGatewayEvent, context: Context) {
    for (const route of routes) {
      if (route.method !== event.httpMethod) {
        continue
      }

      const match = new UrlPattern(route.pattern).match(event.path)
      if (!match) {
        continue
      }

      logger('router match', {
        httpMethod: event.httpMethod,
        path: event.path
      })

      try {
        const { statusCode, body } = await route.handler(event, context)

        return {
          statusCode: statusCode,
          body: body
        }
      } catch (error) {
        logger('router handler error', error)
        const errorFormated = httpErrorFormatter(error as Error)

        return {
          statusCode: errorFormated.statusCode,
          body: JSON.stringify(errorFormated.body)
        }
      }
    }

    logger('router no match', {
      httpMethod: event.httpMethod,
      path: event.path
    })

    return {
      statusCode: 404,
      body: `Cannot ${event.httpMethod} ${event.path}`
    }
  }
}

function httpErrorFormatter(error: Error) {
  const debug = JSON.parse(safeStringify(error))

  let status = 500
  let name = 'Internal Server Error'

  if (error instanceof ValidationError) {
    status = 400
    name = 'Bad Request'
  }

  return {
    statusCode: status,
    body: {
      error: name,
      message: error.message,
      timestamp: new Date().toISOString(),
      debug: debug
    }
  }
}

export interface HttpRoute {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  pattern: string
  handler: HttpRouteHandler
}

export type HttpRouteHandler = {
  (event: APIGatewayEvent, context: Context): Promise<{
    statusCode: number
    body: string
  }>
}
