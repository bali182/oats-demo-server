import { ServerConfiguration } from '@oats-ts/openapi-http-server'
import { ExpressParameters } from '@oats-ts/openapi-http-server/lib/express'
import { Router } from 'express'
import { BookStoreApi } from '../api/BookStoreApi'
import { BookStoreRouters } from './BookStoreRouters'
import { createBookRouter } from './createBookRouter'
import { getBookRouter } from './getBookRouter'
import { getBooksRouter } from './getBooksRouter'
import { updateBookRouter } from './updateBookRouter'

export function createBookStoreRouter(
  api: BookStoreApi<ExpressParameters>,
  configuration: ServerConfiguration<ExpressParameters>,
  routes: Partial<BookStoreRouters> = {},
): Router {
  return Router().use(
    (_, response, next) => {
      response.locals['__oats_api'] = api
      response.locals['__oats_configuration'] = configuration
      next()
    },
    routes.createBookRouter ?? createBookRouter,
    routes.getBookRouter ?? getBookRouter,
    routes.getBooksRouter ?? getBooksRouter,
    routes.updateBookRouter ?? updateBookRouter,
  )
}
