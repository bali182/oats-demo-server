import { ExpressServerConfiguration } from "@oats-ts/openapi-http-server/lib/express";
import express from "express";
import { BookStoreApiImpl } from "./BookStoreApiImpl";
import { bookStoreCorsMiddleware } from "./generated/routers/bookStoreCorsMiddleware";
import { createBookStoreRouter } from "./generated/routers/createBookStoreRouter";

const port = 5000;

const app = express();
app.set("json spaces", 2);
app.use(express.json());
app.use(bookStoreCorsMiddleware("http://localhost:3000"));
app.use(
  createBookStoreRouter(
    new BookStoreApiImpl(),
    new ExpressServerConfiguration()
  )
);

app.listen(port, () => {
  console.log(`Book store app listening at http://localhost:${port}`);
});
