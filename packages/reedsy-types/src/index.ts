interface BookExportRequest {
  bookId: string,
  type: "epub" | "pdf"
}

interface BookImportRequest {
  bookId: string,
  type: "word" | "pdf" | "wattpad" | "evernote",
  url: string
}

type OperationState = "pending" | "finished" | "error"