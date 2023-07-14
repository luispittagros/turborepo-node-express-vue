import request from 'supertest'
import { expect } from 'chai'
import express, { Express } from 'express'
import { createImportJob } from '@/controllers/jobs'
import { JobState, JobType } from 'shared-types'
import { v4 as uuid } from 'uuid'

let app: Express

const validImportBook = { bookId: uuid(), type: 'pdf', url: 'https://test.com/book2.pdf' }

beforeEach(() => {
  app = express()
  app.use(express.json())
  app.post('/import', createImportJob)
})

describe('POST /import', () => {
  it('should create an import job', async () => {
    const response = await request(app).post('/import').send(validImportBook)

    expect(response.status).to.equal(201)
    expect(response.body).to.have.property('book')
    expect(response.body.book).to.have.property('id', validImportBook.bookId)
    expect(response.body.book).to.have.property('type', validImportBook.type)
    expect(response.body.book).to.have.property('url', validImportBook.url)
    expect(response.body).to.have.property('type', JobType.IMPORT)
    expect(response.body).to.have.property('state', JobState.PENDING)
  })

  it('should not create an import job with invalid body', async () => {
    const response = await request(app).post('/import').send({ bookId: validImportBook.bookId })

    expect(response.status).to.equal(400)
  })
})
