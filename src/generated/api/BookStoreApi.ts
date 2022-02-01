import { AddBookServerRequest } from '../requests/AddBookServerRequest'
import { UpdateBookServerRequest } from '../requests/UpdateBookServerRequest'
import { AddBookResponse } from '../responses/AddBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { UpdateBookResponse } from '../responses/UpdateBookResponse'

export type BookStoreApi<T> = {
  /**
   * Creates a new book based on the request body. The id field can be ommited (will be ignored)
   */
  addBook(request: AddBookServerRequest, toolkit: T): Promise<AddBookResponse>
  getBooks(toolkit: T): Promise<GetBooksResponse>
  /**
   * Updates the book associated with the given bookId
   */
  updateBook(request: UpdateBookServerRequest, toolkit: T): Promise<UpdateBookResponse>
}
