import { Response, NextFunction } from 'express'
import { Book } from 'reedsy-types'
import { ReedsyRequest, RequestBody } from '@/types/request'

interface Pagination {
  page: string
  limit: string
}

export const list = async (
  request: ReedsyRequest<RequestBody, Pagination>,
  response: Response,
  next: NextFunction
) => {
  try {
    const books: Book[] = await import('@/data/books.json').then((module) => module.default.books)

    const { page = '1', limit = '5' }: { page: string; limit: string } = request.query

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    const startIndex = (pageNumber - 1) * limitNumber
    const endIndex = pageNumber * limitNumber

    const results = books.slice(startIndex, endIndex)
    response.status(200).json(results)
  } catch (error) {
    next(error)
  }
}
