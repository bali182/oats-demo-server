import { HasRequestBody } from '@oats-ts/openapi-http'
import { Try } from '@oats-ts/try'
import { Book } from '../types/Book'

export type CreateBookServerRequest = HasRequestBody<'application/json', Try<Book>>
