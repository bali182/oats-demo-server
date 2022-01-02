import { Router } from 'express'

export type BookStoreRouters = {
  createBookRouter: Router
  getBookRouter: Router
  getBooksRouter: Router
  updateBookRouter: Router
}
