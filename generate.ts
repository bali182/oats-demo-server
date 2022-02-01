import {
  generate,
  nameProviders,
  pathProviders,
  reader,
  writer,
  prettierStringify,
  validator,
  presets,
} from '@oats-ts/openapi'
import { readFileSync, rmSync } from 'fs'
import { resolve } from 'path'

const PATH = resolve('src/generated')
const PRETTIER_CONFIG = JSON.parse(readFileSync(resolve('.prettierrc'), 'utf-8'))

rmSync(PATH, { force: true, recursive: true })

generate({
  configuration: {
    log: true,
    name: nameProviders.default(),
    path: pathProviders.default(PATH),
  },
  generators: presets.server(),
  reader: reader({
    path: 'https://raw.githubusercontent.com/bali182/oats-demo-schema/master/schema.json',
  }),
  validator: validator(),
  writer: writer({
    stringify: prettierStringify(PRETTIER_CONFIG),
  }),
})
