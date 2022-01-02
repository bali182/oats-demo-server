import { NodeFetchClientConfiguration } from "@oats-ts/openapi-http-client/lib/node-fetch";
import { ExpressServerConfiguration } from "@oats-ts/openapi-http-server/lib/express";
import { BookStoreApiImpl } from "./BookStoreApiImpl";
import { useExpressServer } from "@oats-ts/openapi-test-utils";
import express from "express";
import { createBookStoreRouter } from "./generated/routers/createBookStoreRouter";
import { BookStoreClientSdk } from "./generated/sdk/BookStoreClientSdk";
import {
  books,
  wildGuideBears,
  bearViewingInAlaska,
  grizzlyHeart,
} from "./data";
import { Book } from "./generated/types/Book";

describe("Http methods", () => {
  useExpressServer({
    port: 3333,
    runBeforeAndAfter: "each",
    handlers: [
      express.json(),
      createBookStoreRouter(
        new BookStoreApiImpl(),
        new ExpressServerConfiguration()
      ),
    ],
  });
  const sdk = new BookStoreClientSdk(
    new NodeFetchClientConfiguration("http://localhost:3333")
  );

  describe("happy path", () => {
    it("should retrieve the default books", async () => {
      const response = await sdk.getBooks();
      expect(response.body).toEqual(books);
    });

    it("should get book by id", async () => {
      const book1Response = await sdk.getBook({
        path: { bookId: wildGuideBears.id },
      });
      expect(book1Response.body).toEqual(wildGuideBears);

      const book2Response = await sdk.getBook({
        path: { bookId: grizzlyHeart.id },
      });
      expect(book2Response.body).toEqual(grizzlyHeart);

      const book3Response = await sdk.getBook({
        path: { bookId: bearViewingInAlaska.id },
      });
      expect(book3Response.body).toEqual(bearViewingInAlaska);
    });

    it("should create a new book", async () => {
      const hippoBook: Book = {
        id: -1,
        author: "Hippo",
        bookType: "digital",
        price: 200,
        title: "The Hippo book",
      };
      const hippoBookResponse = await sdk.createBook({
        body: hippoBook,
        mimeType: "application/json",
      });
      expect(hippoBookResponse.body).toEqual({ ...hippoBook, id: 4 });
    });

    it("should update an existing book", async () => {
      const updateBook1: Book = {
        ...wildGuideBears,
        title: "Wild Guide: Pandas",
      };
      const catBookResponse = await sdk.updateBook({
        path: { bookId: wildGuideBears.id },
        body: updateBook1,
        mimeType: "application/json",
      });
      expect(catBookResponse.body).toEqual(updateBook1);
    });
  });
  // With the SDK we can't produce structural issues, but can do semantic issues that the server checks
  describe("issues", () => {
    it("should fail to retrieve a non-existing book", async () => {
      const response = await sdk.getBook({
        path: { bookId: 10 },
      });
      expect(response.body).toEqual([
        { message: '[ERROR] in "path.bookId": No book with id 10' },
      ]);
    });
  });
});
