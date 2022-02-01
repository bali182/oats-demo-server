import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter'
import { ServerAdapter } from '@oats-ts/openapi-http'
import { Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { addBookRouter } from './addBookRouter'
import { BookStoreRouters } from './BookStoreRouters'
import { getBooksRouter } from './getBooksRouter'
import { updateBookRouter } from './updateBookRouter'

export function createBookStoreRouter(
  api: BookStoreApi<ExpressToolkit>,
  configuration: ServerAdapter<ExpressToolkit>,
  routes: Partial<BookStoreRouters> = {},
): Router {
  return Router().use(
    (_, response, next) => {
      response.locals['__oats_api'] = api
      response.locals['__oats_configuration'] = configuration
      next()
    },
    routes.addBookRouter ?? addBookRouter,
    routes.getBooksRouter ?? getBooksRouter,
    routes.updateBookRouter ?? updateBookRouter,
  )
}
