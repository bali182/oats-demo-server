import { CreateBookRequest } from '../requests/CreateBookRequest'
import { GetBookRequest } from '../requests/GetBookRequest'
import { UpdateBookRequest } from '../requests/UpdateBookRequest'
import { CreateBookResponse } from '../responses/CreateBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { UpdateBookResponse } from '../responses/UpdateBookResponse'

export type BookStoreSdk = {
  /**
   * Creates a new book based on the request body. The id field can be ommited (will be ignored)
   */
  createBook(input: CreateBookRequest): Promise<CreateBookResponse>
  /**
   * Returns the book associated with the given bookId
   */
  getBook(input: GetBookRequest): Promise<GetBookResponse>
  getBooks(): Promise<GetBooksResponse>
  /**
   * Updates the book associated with the given bookId
   */
  updateBook(input: UpdateBookRequest): Promise<UpdateBookResponse>
}
