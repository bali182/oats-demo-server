import { CreateBookRequest } from '../requests/CreateBookRequest'
import { GetBookRequest } from '../requests/GetBookRequest'
import { UpdateBookRequest } from '../requests/UpdateBookRequest'
import { CreateBookResponse } from '../responses/CreateBookResponse'
import { GetBookResponse } from '../responses/GetBookResponse'
import { GetBooksResponse } from '../responses/GetBooksResponse'
import { UpdateBookResponse } from '../responses/UpdateBookResponse'
import { BookStoreSdk } from './BookStoreSdk'

export class BookStoreSdkStub implements BookStoreSdk {
  public async createBook(_input: CreateBookRequest): Promise<CreateBookResponse> {
    throw new Error('Stub method "createBook" called. You should implement this method if you want to use it.')
  }
  public async getBook(_input: GetBookRequest): Promise<GetBookResponse> {
    throw new Error('Stub method "getBook" called. You should implement this method if you want to use it.')
  }
  public async getBooks(): Promise<GetBooksResponse> {
    throw new Error('Stub method "getBooks" called. You should implement this method if you want to use it.')
  }
  public async updateBook(_input: UpdateBookRequest): Promise<UpdateBookResponse> {
    throw new Error('Stub method "updateBook" called. You should implement this method if you want to use it.')
  }
}
