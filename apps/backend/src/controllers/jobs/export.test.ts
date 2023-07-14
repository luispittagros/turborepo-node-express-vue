import request from 'supertest'
import { expect } from 'chai'
import express, { Express } from 'express'
import { createExportJob } from '@/controllers/jobs'
import { JobState, JobType } from 'shared-types'
import { v4 as uuid } from 'uuid'

let app: Express

const validExportBook = { bookId: uuid(), type: 'epub' }

beforeEach(() => {
  app = express()
  app.use(express.json())
  app.post('/export', createExportJob)
})

describe('POST /export', () => {
  it('should create an export job', async () => {
    const response = await request(app).post('/export').send(validExportBook)

    expect(response.statusCode).to.equal(201)
    expect(response.body).to.have.property('book')
    expect(response.body.book).to.have.property('id', validExportBook.bookId)
    expect(response.body.book).to.have.property('type', validExportBook.type)
    expect(response.body).to.have.property('type', JobType.EXPORT)
    expect(response.body).to.have.property('state', JobState.PENDING)
  })

  it('should not create an export job with invalid body', async () => {
    const response = await request(app).post('/export').send({ bookId: validExportBook.bookId })

    expect(response.status).to.equal(400)
  })
})
