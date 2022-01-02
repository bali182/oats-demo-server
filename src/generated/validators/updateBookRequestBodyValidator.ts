import { bookTypeValidator } from './bookTypeValidator'

export const updateBookRequestBodyValidator = { 'application/json': bookTypeValidator } as const
