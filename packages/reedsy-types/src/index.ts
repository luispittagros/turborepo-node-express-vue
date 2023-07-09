export interface Book {
  id: string;
  title: string;
  description: string;
  type: BookType;
  rating: number;
}

export type BookType = "word" | "pdf" | "wattpad" | "evernote" | "epub";

export interface Job {
  id: string;
  bookId: Book["id"];
  type: string;
  state: JobState;
  createdAt: Date;
  updatedAt: Date;
}

type JobState = "pending" | "finished" | "error";

export interface BookExportRequest {
  bookId: Book["id"];
  type: Extract<"epub" | "pdf", BookType>;
}

export interface BookImportRequest {
  bookId: Book["id"];
  type: Extract<"word" | "pdf" | "wattpad" | "evernote", BookType>;
  url: string;
}
