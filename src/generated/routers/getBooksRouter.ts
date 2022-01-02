import { RawHttpResponse } from '@oats-ts/openapi-http'
import { ServerConfiguration } from '@oats-ts/openapi-http-server'
import { ExpressParameters } from '@oats-ts/openapi-http-server/lib/express'
import { NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'

export const getBooksRouter: Router = Router().get(
  '/books',
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const frameworkInput: ExpressParameters = { request, response, next }
    const configuration: ServerConfiguration<ExpressParameters> = response.locals['__oats_configuration']
    const api: BookStoreApi<ExpressParameters> = response.locals['__oats_api']
    try {
      const typedResponse = await api.getBooks(frameworkInput)
      const rawResponse: RawHttpResponse = {
        headers: await configuration.getResponseHeaders(frameworkInput, typedResponse, undefined),
        statusCode: await configuration.getStatusCode(frameworkInput, typedResponse),
        body: await configuration.getResponseBody(frameworkInput, typedResponse),
      }
      return configuration.respond(frameworkInput, rawResponse)
    } catch (error) {
      configuration.handleError(frameworkInput, error)
      throw error
    }
  },
)
