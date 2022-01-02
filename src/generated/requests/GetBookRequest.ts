import { HasPathParameters } from '@oats-ts/openapi-http'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export type GetBookRequest = HasPathParameters<GetBookPathParameters>
