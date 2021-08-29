import express from "express";
import { nanoid } from "nanoid";
import { books, error } from "./data";
import { isBook } from "./typeGuards";
import { Book } from "./types";

const app = express();
app.set("json spaces", 2);
app.use(express.json());

const port = 3000;

app.get("/books", (req, res) => {
  return res.status(200).json(books);
});

app.post("/books", (req, res) => {
  const body: Book = req.body;
  if (!isBook(body)) {
    return res.status(400).json(error(`Request body should be of type "Book"`));
  }
  const book: Book = { ...body, id: nanoid() };
  books.push(book);
  return res.status(201).json(book);
});

app.patch("/books/:bookId", (req, res) => {
  if (books.find(({ id }) => id === req.params.bookId) === undefined) {
    return res
      .status(400)
      .json(error(`Book "${req.params.bookId}" doesn't exist`));
  }
  const body: Book = req.body;
  if (!isBook(body)) {
    return res.status(400).json(error(`Request body should be of type "Book"`));
  }
  const { id: _, ...changes } = body;
  books.forEach((book, index) => {
    if (book.id === req.params.bookId) {
      books[index] = { ...book, ...changes };
    }
  });
  const updatedBook = books.find(({ id }) => id === req.params.bookId);
  return res.status(200).json(updatedBook);
});

app.get("/books/:bookId", (req, res) => {
  const book = books.find(({ id }) => id === req.params.bookId);
  if (book === undefined) {
    return res
      .status(400)
      .json(error(`Book "${req.params.bookId}" doesn't exist`));
  }
  return res.status(200).json(book);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
