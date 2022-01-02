import { HttpResponse } from '@oats-ts/openapi-http'
import { AppError } from '../types/AppError'
import { Book } from '../types/Book'

export type GetBooksResponse =
  | HttpResponse<Book[], 200, 'application/json', undefined>
  | HttpResponse<AppError[], 400, 'application/json', undefined>
  | HttpResponse<AppError[], 500, 'application/json', undefined>
