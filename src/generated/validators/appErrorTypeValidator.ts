import { object, shape, string } from '@oats-ts/validators'

export const appErrorTypeValidator = object(shape({ message: string() }))
