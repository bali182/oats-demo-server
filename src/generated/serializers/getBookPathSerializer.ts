import { createPathSerializer, serializers } from '@oats-ts/openapi-parameter-serialization'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export const getBookPathSerializer = createPathSerializer<GetBookPathParameters>('/books/{bookId}', {
  bookId: serializers.path.simple.primitive<number>({}),
})
