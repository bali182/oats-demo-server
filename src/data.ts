import { AppError } from "./generated/types/AppError";
import { Book } from "./generated/types/Book";

export const wildGuideBears: Book = {
  id: 1,
  title: "Wild Guide: Bears",
  author: "Charles Fergus",
  bookType: "paperback",
  price: 10,
  description: "This is a book about bears",
};

export const grizzlyHeart: Book = {
  id: 2,
  title: "Grizzly Heart",
  author: "Charles Russell & Maureen Enns",
  bookType: "digital",
  price: 5,
  description: "This is another book about bears",
};

export const bearViewingInAlaska: Book = {
  id: 3,
  title: "Bear-viewing in Alaska",
  author: "Stephen Stringham",
  bookType: "audio",
  price: 15,
  description: "This is an audio book about bears",
};

export const books: Book[] = [
  wildGuideBears,
  grizzlyHeart,
  bearViewingInAlaska,
];

export function error(message: string): AppError {
  return {
    message,
  };
}
