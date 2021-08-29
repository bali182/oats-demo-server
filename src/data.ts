import { nanoid } from "nanoid";
import { AppError, AppErrorCode, Book, BookType } from "./types";

export const books: Book[] = [
  {
    id: nanoid(),
    title: "Wild Guide: Bears",
    author: "Charles Fergus",
    bookType: BookType.paperback,
    price: 10,
    description: "This is a book about bears",
  },
  {
    id: nanoid(),
    title: "Grizzly Heart",
    author: "Charles Russell & Maureen Enns",
    bookType: BookType.digital,
    price: 5,
    description: "This is another book about bears",
  },
  {
    id: nanoid(),
    title: "Bear-viewing in Alaska",
    author: "Stephen Stringham",
    bookType: BookType.audio,
    price: 15,
    description: "This is an audio book about bears",
  },
];

export function error(message: string): AppError {
  return {
    code: AppErrorCode.generic,
    message,
  };
}
