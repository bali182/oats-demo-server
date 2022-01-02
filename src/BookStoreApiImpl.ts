import { ExpressParameters } from "@oats-ts/openapi-http-server/lib/express";
import { failure, fluent, success, zip } from "@oats-ts/try";
import { Issue, stringify } from "@oats-ts/validators";
import { books } from "./data";
import { BookStoreApi } from "./generated/api/BookStoreApi";
import { CreateBookServerRequest } from "./generated/requests/CreateBookServerRequest";
import { GetBookServerRequest } from "./generated/requests/GetBookServerRequest";
import { UpdateBookServerRequest } from "./generated/requests/UpdateBookServerRequest";
import { CreateBookResponse } from "./generated/responses/CreateBookResponse";
import { GetBookResponse } from "./generated/responses/GetBookResponse";
import { GetBooksResponse } from "./generated/responses/GetBooksResponse";
import { UpdateBookResponse } from "./generated/responses/UpdateBookResponse";
import { AppError } from "./generated/types/AppError";
import { Book } from "./generated/types/Book";

export class BookStoreApiImpl implements BookStoreApi<ExpressParameters> {
  private books: Book[] = Array.from(books);

  async getBooks(): Promise<GetBooksResponse> {
    return {
      body: this.books,
      headers: undefined,
      mimeType: "application/json",
      statusCode: 200,
    };
  }

  async createBook(
    input: CreateBookServerRequest
  ): Promise<CreateBookResponse> {
    return fluent(input.body)
      .map(
        (book): Book => ({
          ...book,
          id: Math.max(...this.books.map(({ id }) => id)) + 1,
        })
      )
      .doIfSuccess((book) => this.books.push(book))
      .get(
        (book): CreateBookResponse => ({
          body: book,
          headers: undefined,
          mimeType: "application/json",
          statusCode: 201,
        }),
        (issues: Issue[]): CreateBookResponse => ({
          body: issues.map(stringify).map((message): AppError => ({ message })),
          headers: undefined,
          mimeType: "application/json",
          statusCode: 400,
        })
      );
  }

  async getBook(input: GetBookServerRequest): Promise<GetBookResponse> {
    return fluent(input.path)
      .flatMap(({ bookId }) => {
        const book = this.books.find(({ id }) => id === bookId);
        return book === undefined
          ? failure([
              {
                message: `No book with id ${bookId}`,
                severity: "error",
                path: "path.bookId",
                type: "",
              },
            ])
          : success(book);
      })
      .get(
        (book): GetBookResponse => ({
          body: book,
          headers: undefined,
          mimeType: "application/json",
          statusCode: 200,
        }),
        (issues: Issue[]): GetBookResponse => ({
          body: issues.map(stringify).map((message): AppError => ({ message })),
          headers: undefined,
          mimeType: "application/json",
          statusCode: 400,
        })
      );
  }

  async updateBook(
    input: UpdateBookServerRequest
  ): Promise<UpdateBookResponse> {
    return fluent(zip(input.path, input.body))
      .flatMap<Book>(([{ bookId }, updates]) => {
        const book = this.books.find(({ id }) => id === bookId);
        return book === undefined
          ? failure([
              {
                message: `No book with id ${bookId}`,
                severity: "error",
                path: "path.bookId",
                type: "",
              },
            ])
          : success({ ...book, ...updates, id: bookId });
      })
      .doIfSuccess((updatedBook) => {
        this.books = this.books.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        );
      })
      .get(
        (book): UpdateBookResponse => ({
          body: book,
          headers: undefined,
          mimeType: "application/json",
          statusCode: 200,
        }),
        (issues: Issue[]): UpdateBookResponse => ({
          body: issues.map(stringify).map((message): AppError => ({ message })),
          headers: undefined,
          mimeType: "application/json",
          statusCode: 400,
        })
      );
  }
}
