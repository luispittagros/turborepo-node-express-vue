import { Request, Response, NextFunction } from "express";

interface Book {
  id: string;
  title: string;
  description: string;
  rating: number;
}

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books: Book[] = [];
    res.json(books);
  } catch (error) {
    next(error);
  }
};
