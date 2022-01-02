import { ExpressServerConfiguration } from "@oats-ts/openapi-http-server/lib/express";
import express from "express";
import { BookStoreApiImpl } from "./BookStoreApiImpl";
import { createBookStoreRouter } from "./generated/routers/createBookStoreRouter";

const app = express();
app.set("json spaces", 2);
app.use(express.json());

const port = 3000;

app.use(
  createBookStoreRouter(
    new BookStoreApiImpl(),
    new ExpressServerConfiguration()
  )
);

app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`);
});
