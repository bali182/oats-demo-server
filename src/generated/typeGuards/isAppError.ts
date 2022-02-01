import { AppError } from '../types/AppError'

export function isAppError(input: any): input is AppError {
  return input !== null && typeof input === 'object' && typeof input.message === 'string'
}
