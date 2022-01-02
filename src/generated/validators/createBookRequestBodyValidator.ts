import { bookTypeValidator } from './bookTypeValidator'

export const createBookRequestBodyValidator = { 'application/json': bookTypeValidator } as const
