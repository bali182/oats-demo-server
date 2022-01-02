import { RawHttpRequest } from '@oats-ts/openapi-http'
import { ClientConfiguration } from '@oats-ts/openapi-http-client'
import { GetBookRequest } from '../requests/GetBookRequest'
import { GetBookResponse } from '../responses/GetBookResponse'
import { getBookPathSerializer } from '../serializers/getBookPathSerializer'
import { getBookResponseBodyValidator } from '../validators/getBookResponseBodyValidator'

/**
 * Returns the book associated with the given bookId
 */
export async function getBook(input: GetBookRequest, configuration: ClientConfiguration): Promise<GetBookResponse> {
  const path = await configuration.getPath(input, getBookPathSerializer)
  const requestUrl = await configuration.getUrl(path, undefined)
  const requestHeaders = await configuration.getRequestHeaders(input, undefined)
  const rawRequest: RawHttpRequest = {
    url: requestUrl,
    method: 'get',
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
    getBookResponseBodyValidator,
  )
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as GetBookResponse
  return response
}
