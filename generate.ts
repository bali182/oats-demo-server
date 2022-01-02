import {
  generators,
  generate,
  nameProviders,
  pathProviders,
  validator,
  writer,
  reader,
  prettierStringify,
  presets,
} from "@oats-ts/openapi";
import { promises as fs } from "fs";
import path from "path";

/**
 * Generates the server side code for the bookstore example
 * @param schemaPath The path of the input OpenAPI schema
 * @param sourcePath The path where you wanna put the generated output
 */
async function generateBookStoreSchema(schemaPath: string, sourcePath: string) {
  await fs.rm(path.resolve(sourcePath), { recursive: true, force: true });
  return generate({
    configuration: {
      log: true,
      name: nameProviders.default(),
      path: pathProviders.default(sourcePath),
    },
    validator: validator(),
    reader: reader({ path: schemaPath }),
    generators: presets.fullStack(),
    writer: writer({
      stringify: prettierStringify({
        parser: "typescript",
        arrowParens: "always",
        printWidth: 120,
        semi: false,
        singleQuote: true,
        trailingComma: "all",
      }),
    }),
  });
}

generateBookStoreSchema("schema.json", "src/generated");
