import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-http'
import { NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { updateBookPathDeserializer } from '../deserializers/updateBookPathDeserializer'
import { UpdateBookServerRequest } from '../requests/UpdateBookServerRequest'
import { Book } from '../types/Book'
import { updateBookRequestBodyValidator } from '../validators/updateBookRequestBodyValidator'

export const updateBookRouter: Router = Router().put(
  '/books/:bookId',
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const toolkit: ExpressToolkit = { request, response, next }
    const configuration: ServerAdapter<ExpressToolkit> = response.locals['__oats_configuration']
    const api: BookStoreApi<ExpressToolkit> = response.locals['__oats_api']
    try {
      const path = await configuration.getPathParameters(toolkit, updateBookPathDeserializer)
      const mimeType = await configuration.getMimeType<'application/json'>(toolkit)
      const body = await configuration.getRequestBody<'application/json', Book>(
        toolkit,
        mimeType,
        updateBookRequestBodyValidator,
      )
      const typedRequest: UpdateBookServerRequest = {
        path,
        mimeType,
        body,
      }
      const typedResponse = await api.updateBook(typedRequest, toolkit)
      const rawResponse: RawHttpResponse = {
        headers: await configuration.getResponseHeaders(toolkit, typedResponse, undefined),
        statusCode: await configuration.getStatusCode(toolkit, typedResponse),
        body: await configuration.getResponseBody(toolkit, typedResponse),
      }
      return configuration.respond(toolkit, rawResponse)
    } catch (error) {
      configuration.handleError(toolkit, error)
      throw error
    }
  },
)
