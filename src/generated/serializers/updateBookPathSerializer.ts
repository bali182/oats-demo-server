import { createPathSerializer, serializers } from '@oats-ts/openapi-parameter-serialization'
import { UpdateBookPathParameters } from '../parameters/UpdateBookPathParameters'

export const updateBookPathSerializer = createPathSerializer<UpdateBookPathParameters>('/books/{bookId}', {
  bookId: serializers.path.simple.primitive<number>({}),
})
