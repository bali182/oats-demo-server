import { HasRequestBody } from '@oats-ts/openapi-http'
import { Book } from '../types/Book'

export type CreateBookRequest = HasRequestBody<'application/json', Book>
