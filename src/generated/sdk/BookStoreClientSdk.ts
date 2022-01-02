import { ClientConfiguration } from '@oats-ts/openapi-http-client'
import { createBook } from '../operations/createBook'
import { getBook } from '../operations/getBook'
import { getBooks } from '../operations/getBooks'
import { updateBook } from '../operations/updateBook'
import { CreateBookRequest } from '../requests/CreateBookRequest'
import { GetBookRequest } from '../requests/GetBookRequest'
import { UpdateBookRequest } from '../requests/UpdateBookRequest'
import { CreateBookResponse } from '../responses/CreateBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { UpdateBookResponse } from '../responses/UpdateBookResponse'
import { BookStoreSdk } from './BookStoreSdk'

export class BookStoreClientSdk implements BookStoreSdk {
  protected readonly config: ClientConfiguration
  public constructor(config: ClientConfiguration) {
    this.config = config
  }
  public async createBook(input: CreateBookRequest): Promise<CreateBookResponse> {
    return createBook(input, this.config)
  }
  public async getBook(input: GetBookRequest): Promise<GetBookResponse> {
    return getBook(input, this.config)
  }
  public async getBooks(): Promise<GetBooksResponse> {
    return getBooks(this.config)
  }
  public async updateBook(input: UpdateBookRequest): Promise<UpdateBookResponse> {
    return updateBook(input, this.config)
  }
}
