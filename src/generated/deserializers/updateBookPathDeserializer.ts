import { createPathDeserializer, deserializers } from '@oats-ts/openapi-parameter-deserialization'
import { UpdateBookPathParameters } from '../parameters/UpdateBookPathParameters'

export const updateBookPathDeserializer = createPathDeserializer<UpdateBookPathParameters>(
  ['bookId'],
  /^\/books(?:\/([^\/#\?]+?))[\/#\?]?$/i,
  { bookId: deserializers.path.simple.primitive(deserializers.value.number(), {}) },
)
