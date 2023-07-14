export enum BookType {
  EPUB = "epub",
  PDF = "pdf",
  WORD = "word",
  WATTPAD = "wattpad",
  EVERNOTE = "evernote",
}

export interface Book {
  type?: BookType;
  title: string;
  synopsis: string;
  slug: string;
  rating: string;
  author: string;
  cover: string;
  upvoted?: boolean;
  upvotes?: number;
  publishedAt: string;
  buyOn: {
    label: string;
    url: string;
  }[];
}

export interface BookExportRequestBody {
  bookId: string;
  type: Extract<BookType.EPUB | BookType.PDF, BookType>;
}

export interface BookImportRequestBody {
  bookId: string;
  type: Extract<
    BookType.WORD | BookType.PDF | BookType.WATTPAD | BookType.EVERNOTE,
    BookType
  >;
  url: string;
}

export interface BooksResponse {
  books: Book[];
  meta: {
    count: number;
  };
}
