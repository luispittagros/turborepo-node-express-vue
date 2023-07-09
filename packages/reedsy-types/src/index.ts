interface Job {
  id: string;
  bookId: string;
  type: string;
  state: JobState;
  createdAt: Date;
  updatedAt: Date;
}

type JobState = "pending" | "finished" | "error";

interface BookExportRequest {
  bookId: string;
  type: "epub" | "pdf";
}

interface BookImportRequest {
  bookId: string;
  type: "word" | "pdf" | "wattpad" | "evernote";
  url: string;
}
