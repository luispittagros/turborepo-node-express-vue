import request from 'supertest'
import { expect } from 'chai'
import express, { Express } from 'express'
import { createExportJob, createImportJob, getExports, getImports } from '@/controllers/jobs'

let app: Express

const validExportBook = { bookId: 'book1', type: 'epub' }
const validImportBook = { bookId: 'book2', type: 'pdf', url: 'https://test.com/book2.pdf' }

beforeEach(() => {
  app = express()
  app.use(express.json())
  app.post('/export', createExportJob)
  app.get('/export', getExports)
  app.post('/import', createImportJob)
  app.get('/import', getImports)
})

describe('POST /export', () => {
  it('should create an export job', async () => {
    const response = await request(app).post('/export').send(validExportBook)

    expect(response.statusCode).to.equal(201)
    expect(response.body).to.have.property('bookId', validExportBook.bookId)
    expect(response.body).to.have.property('bookType', validExportBook.type)
    expect(response.body).to.have.property('state', 'pending')
  })

  it('should not create an export job with invalid body', async () => {
    const response = await request(app).post('/export').send({ bookId: validExportBook.bookId })

    expect(response.status).to.equal(400)
  })
})

describe('GET /export', () => {
  it('should get export jobs', async () => {
    const response = await request(app).get('/export')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('pending')
    expect(response.body.pending[0]).to.have.property('bookId', validExportBook.bookId)
  })
})

describe('POST /import', () => {
  it('should create an import job', async () => {
    const response = await request(app).post('/import').send(validImportBook)

    expect(response.status).to.equal(201)
    expect(response.body).to.have.property('bookId', validImportBook.bookId)
    expect(response.body).to.have.property('bookType', validImportBook.type)
    expect(response.body).to.have.property('url', validImportBook.url)
    expect(response.body).to.have.property('state', 'pending')
  })

  it('should not create an import job with invalid body', async () => {
    const response = await request(app).post('/import').send({ bookId: validImportBook.bookId })

    expect(response.status).to.equal(400)
  })
})

describe('GET /import', () => {
  it('should get import jobs', async () => {
    const response = await request(app).get('/import')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('pending')
    expect(response.body.pending[0]).to.have.property('bookId', validImportBook.bookId)
  })
})
