import { HasPathParameters } from '@oats-ts/openapi-http'
import { Try } from '@oats-ts/try'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export type GetBookServerRequest = HasPathParameters<Try<GetBookPathParameters>>
