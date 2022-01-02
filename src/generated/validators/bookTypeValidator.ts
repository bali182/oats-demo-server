import { lazy, number, object, optional, shape, string } from '@oats-ts/validators'
import { bookTypeTypeValidator } from './bookTypeTypeValidator'

export const bookTypeValidator = object(
  shape({
    author: string(),
    bookType: lazy(() => bookTypeTypeValidator),
    description: optional(string()),
    id: number(),
    price: number(),
    title: string(),
  }),
)
