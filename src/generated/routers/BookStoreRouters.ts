import { Router } from 'express'

export type BookStoreRouters = {
  addBookRouter: Router
  getBooksRouter: Router
  updateBookRouter: Router
}
