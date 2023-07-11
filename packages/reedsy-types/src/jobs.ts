import { BookType } from "./books";

export enum JobType {
  EXPORT = "export",
  IMPORT = "import",
}

export enum JobState {
  PENDING = "pending",
  FINISHED = "finished",
  ERROR = "error",
}

export interface JobBook {
  id: string;
  type: BookType;
  url?: string;
}

export interface Job {
  id: string;
  type: JobType;
  state: JobState;
  book: JobBook;
  createdAt: Date;
  updatedAt: Date;
}
