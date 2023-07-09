export interface Job {
  id: string;
  bookId: string;
  type: string;
  state: JobState;
  createdAt: Date;
  updatedAt: Date;
}

type JobState = "pending" | "finished" | "error";

export interface BookExportRequest {
  bookId: string;
  type: "epub" | "pdf";
}

export interface BookImportRequest {
  bookId: string;
  type: "word" | "pdf" | "wattpad" | "evernote";
  url: string;
}
