import request from 'supertest'
import { expect } from 'chai'
import express, { Express } from 'express'
import { list } from '@/controllers/books'

let app: Express

beforeEach(() => {
  app = express()
  app.use(express.json())
  app.get('/books', list)
})

describe('GET /books', () => {
  it('should return a list of books', async () => {
    const response = await request(app).get('/books?page=1&limit=5')

    expect(response.status).to.have.equal(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.have.property('books')
    expect(response.body).to.have.property('meta')
    expect(response.body.books).to.be.an('array')
    expect(response.body.books.length).to.equal(5)
  })

  it('should return 404 if page is out of range', async () => {
    const response = await request(app).get('/books?page=1000&limit=5')

    expect(response.status).to.equal(404)
    expect(response.body).to.be.an('object')
    expect(response.body).to.have.property('message', 'No books found')
  })

  it('should return first 5 books if no page and limit are provided', async () => {
    const response = await request(app).get('/books')

    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.have.property('books')
    expect(response.body.books).to.be.an('array')
    expect(response.body.books.length).to.equal(5)
  })
})
