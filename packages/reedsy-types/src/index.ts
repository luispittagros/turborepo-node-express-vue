export interface Book {
  id?: string;
  type?: BookType;
  title: string;
  synopsis: string;
  slug: string;
  rating: string;
  author: string;
  cover: string;
  upvoted: boolean;
  upvotes: number;
}

export type BookType = "word" | "pdf" | "wattpad" | "evernote" | "epub";

export interface Job {
  bookId: string;
  bookType: BookType;
  url?: string;
  state: JobState;
  createdAt: Date;
  updatedAt: Date;
}

export type JobType = "import" | "export";

export type JobState = "pending" | "finished" | "error";

export interface BookExportRequest {
  bookId: string;
  type: Extract<"epub" | "pdf", BookType>;
}

export interface BookImportRequest {
  bookId: string;
  type: Extract<"word" | "pdf" | "wattpad" | "evernote", BookType>;
  url: string;
}

export interface BooksResponse {
  books: Book[];
  meta: {
    count: number;
  };
}
