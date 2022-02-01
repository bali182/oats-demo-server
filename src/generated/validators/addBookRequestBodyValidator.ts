import { bookTypeValidator } from './bookTypeValidator'

export const addBookRequestBodyValidator = { 'application/json': bookTypeValidator } as const
