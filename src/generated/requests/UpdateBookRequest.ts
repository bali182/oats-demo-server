import { HasPathParameters, HasRequestBody } from '@oats-ts/openapi-http'
import { UpdateBookPathParameters } from '../parameters/UpdateBookPathParameters'
import { Book } from '../types/Book'

export type UpdateBookRequest = HasPathParameters<UpdateBookPathParameters> & HasRequestBody<'application/json', Book>
