import { RawHttpRequest } from '@oats-ts/openapi-http'
import { ClientConfiguration } from '@oats-ts/openapi-http-client'
import { CreateBookRequest } from '../requests/CreateBookRequest'
import { CreateBookResponse } from '../responses/CreateBookResponse'
import { createBookResponseBodyValidator } from '../validators/createBookResponseBodyValidator'

/**
 * Creates a new book based on the request body. The id field can be ommited (will be ignored)
 */
export async function createBook(
  input: CreateBookRequest,
  configuration: ClientConfiguration,
): Promise<CreateBookResponse> {
  const requestUrl = await configuration.getUrl('/books', undefined)
  const requestHeaders = await configuration.getRequestHeaders(input, undefined)
  const requestBody = await configuration.getRequestBody(input)
  const rawRequest: RawHttpRequest = {
    url: requestUrl,
    method: 'post',
    body: requestBody,
    headers: requestHeaders,
  }
  const rawResponse = await configuration.request(rawRequest)
  const mimeType = await configuration.getMimeType(rawResponse)
  const statusCode = await configuration.getStatusCode(rawResponse)
  const responseHeaders = await configuration.getResponseHeaders(rawResponse, statusCode, undefined)
  const responseBody = await configuration.getResponseBody(
    rawResponse,
    statusCode,
    mimeType,
    createBookResponseBodyValidator,
  )
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as CreateBookResponse
  return response
}
