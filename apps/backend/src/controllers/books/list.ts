import { Response, NextFunction } from 'express'
import { Book, BooksResponse } from 'shared-types'
import { AppRequest, RequestBody } from '@/types/request'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface Pagination {
  page: string
  limit: string
}

export const list = async (
  request: AppRequest<RequestBody, Pagination>,
  response: Response,
  next: NextFunction
) => {
  try {
    // Not working due to bug/experimental feature in nodejs (assert type: json)
    /* const books: Book[] = await import('../data/books.json', { assert: { type: 'json' } }).then(
      (module) => module.default.books
    )*/

    // Workaround

    const data = JSON.parse(readFileSync(resolve(__dirname, '../../data/books.json'), 'utf8'))
    const books: Book[] = data.books
    const totalBooks: number = data.meta.count

    const { page = '1', limit = '5' }: { page: string; limit: string } = request.query

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    const startIndex = (pageNumber - 1) * limitNumber
    const endIndex = pageNumber * limitNumber

    const results = books.slice(startIndex, endIndex)

    if (!results.length) {
      return response.status(404).json({
        message: 'No books found'
      })
    }

    const booksResponse: BooksResponse = {
      books: results,
      meta: {
        count: totalBooks
      }
    }

    response.status(200).json(booksResponse)
  } catch (error) {
    next(error)
  }
}
