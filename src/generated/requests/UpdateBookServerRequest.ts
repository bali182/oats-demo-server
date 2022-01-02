import { HasPathParameters, HasRequestBody } from '@oats-ts/openapi-http'
import { Try } from '@oats-ts/try'
import { UpdateBookPathParameters } from '../parameters/UpdateBookPathParameters'
import { Book } from '../types/Book'

export type UpdateBookServerRequest = HasPathParameters<Try<UpdateBookPathParameters>> &
  HasRequestBody<'application/json', Try<Book>>
