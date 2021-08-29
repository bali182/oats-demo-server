export enum BookType {
  paperback = "paperback",
  digital = "digital",
  audio = "audio",
}

export type Book = {
  author: string;
  bookType: BookType;
  description?: string;
  id?: string;
  price: number;
  title: string;
};

export type AppError = {
  code: AppErrorCode;
  message: string;
};

export enum AppErrorCode {
  generic = "generic",
}
