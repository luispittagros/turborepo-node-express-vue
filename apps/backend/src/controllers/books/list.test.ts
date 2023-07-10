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
  it('should get a list of books with pagination', async () => {
    const res = await request(app).get('/books?page=1&limit=5')

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body.length).to.equal(5)
  })

  it('should return 404 if page is out of range', async () => {
    const response = await request(app).get('/books?page=1000&limit=5')

    expect(response.status).to.equal(404)
    expect(response.body).to.have.property('message', 'No books found')
  })

  it('should return first 5 books if no page and limit are provided', async () => {
    const response = await request(app).get('/books')

    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('array')
    expect(response.body.length).to.equal(5)
  })
})
