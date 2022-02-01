import { BookType } from './BookType'

export type Book = {
  author: string
  bookType: BookType
  description?: string
  id: number
  price: number
  title: string
}
