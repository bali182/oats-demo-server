import { Book, BookType } from "./types";

export function isBookType(input: any): input is BookType {
  return input === "paperback" || input === "digital" || input === "audio";
}

export function isBook(input: any): input is Book {
  return (
    input !== null &&
    typeof input === "object" &&
    typeof input.author === "string" &&
    isBookType(input.bookType) &&
    (input.description === null ||
      input.description === undefined ||
      typeof input.description === "string") &&
    (input.id === null ||
      input.id === undefined ||
      typeof input.id === "string") &&
    typeof input.price === "number" &&
    typeof input.title === "string"
  );
}
