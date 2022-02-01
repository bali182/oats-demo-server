import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-http'
import { NextFunction, Request, Response, Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { AddBookServerRequest } from '../requests/AddBookServerRequest'
import { Book } from '../types/Book'
import { addBookRequestBodyValidator } from '../validators/addBookRequestBodyValidator'

export const addBookRouter: Router = Router().post(
  '/books',
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const toolkit: ExpressToolkit = { request, response, next }
    const configuration: ServerAdapter<ExpressToolkit> = response.locals['__oats_configuration']
    const api: BookStoreApi<ExpressToolkit> = response.locals['__oats_api']
    try {
      const mimeType = await configuration.getMimeType<'application/json'>(toolkit)
      const body = await configuration.getRequestBody<'application/json', Book>(
        toolkit,
        mimeType,
        addBookRequestBodyValidator,
      )
      const typedRequest: AddBookServerRequest = {
        mimeType,
        body,
      }
      const typedResponse = await api.addBook(typedRequest, toolkit)
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
