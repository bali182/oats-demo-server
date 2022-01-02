import { BookType } from '../types/BookType'

export function isBookType(input: any): input is BookType {
  return input === 'paperback' || input === 'digital' || input === 'audio'
}
