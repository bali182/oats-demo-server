import { CreateBookServerRequest } from '../requests/CreateBookServerRequest'
import { GetBookServerRequest } from '../requests/GetBookServerRequest'
import { UpdateBookServerRequest } from '../requests/UpdateBookServerRequest'
import { CreateBookResponse } from '../responses/CreateBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { UpdateBookResponse } from '../responses/UpdateBookResponse'

export type BookStoreApi<T> = {
  /**
   * Creates a new book based on the request body. The id field can be ommited (will be ignored)
   */
  createBook(input: CreateBookServerRequest, frameworkInput: T): Promise<CreateBookResponse>
  /**
   * Returns the book associated with the given bookId
   */
  getBook(input: GetBookServerRequest, frameworkInput: T): Promise<GetBookResponse>
  getBooks(frameworkInput: T): Promise<GetBooksResponse>
  /**
   * Updates the book associated with the given bookId
   */
  updateBook(input: UpdateBookServerRequest, frameworkInput: T): Promise<UpdateBookResponse>
}
