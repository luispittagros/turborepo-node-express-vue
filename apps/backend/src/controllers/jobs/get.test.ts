import request from 'supertest'
import { expect } from 'chai'
import express, { Express } from 'express'
import { getExports, getImports } from '@/controllers/jobs'
import { JobState } from 'shared-types'

let app: Express

beforeEach(() => {
  app = express()
  app.use(express.json())
  app.get('/export', getExports)
  app.get('/import', getImports)
})

describe('GET /export', () => {
  it('should get export jobs', async () => {
    const validExportBook = { bookId: 'book6', type: 'epub' }

    await request(app).post('/export').send(validExportBook)

    const response = await request(app).get('/export')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(JobState.PENDING)
  })
})

describe('GET /import', () => {
  it('should get import jobs', async () => {
    const response = await request(app).get('/import')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(JobState.PENDING)
  })
})
