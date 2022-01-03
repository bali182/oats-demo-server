import { RawHttpRequest } from '@oats-ts/openapi-http'
import { ClientConfiguration } from '@oats-ts/openapi-http-client'
import { UpdateBookRequest } from '../requests/UpdateBookRequest'
import { UpdateBookResponse } from '../responses/UpdateBookResponse'
import { updateBookPathSerializer } from '../serializers/updateBookPathSerializer'
import { updateBookResponseBodyValidator } from '../validators/updateBookResponseBodyValidator'

/**
 * Updates the book associated with the given bookId
 */
export async function updateBook(
  input: UpdateBookRequest,
  configuration: ClientConfiguration,
): Promise<UpdateBookResponse> {
  const path = await configuration.getPath(input, updateBookPathSerializer)
  const requestUrl = await configuration.getUrl(path, undefined)
  const requestHeaders = await configuration.getRequestHeaders(input, undefined)
  const requestBody = await configuration.getRequestBody(input)
  const rawRequest: RawHttpRequest = {
    url: requestUrl,
    method: 'put',
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
    updateBookResponseBodyValidator,
  )
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as UpdateBookResponse
  return response
}
