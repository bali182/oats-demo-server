import { createPathDeserializer, deserializers } from '@oats-ts/openapi-parameter-deserialization'
import { GetBookPathParameters } from '../parameters/GetBookPathParameters'

export const getBookPathDeserializer = createPathDeserializer<GetBookPathParameters>(
  ['bookId'],
  /^\/books(?:\/([^\/#\?]+?))[\/#\?]?$/i,
  { bookId: deserializers.path.simple.primitive(deserializers.value.number(), {}) },
)
