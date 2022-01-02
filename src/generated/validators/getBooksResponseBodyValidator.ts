import { array, items, lazy } from '@oats-ts/validators'
import { appErrorTypeValidator } from './appErrorTypeValidator'
import { bookTypeValidator } from './bookTypeValidator'

export const getBooksResponseBodyValidator = {
  200: { 'application/json': array(items(lazy(() => bookTypeValidator))) },
  400: { 'application/json': array(items(lazy(() => appErrorTypeValidator))) },
  500: { 'application/json': array(items(lazy(() => appErrorTypeValidator))) },
} as const
