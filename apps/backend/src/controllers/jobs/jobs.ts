import { Request, Response } from 'express'
import { Job } from 'reedsy-types'
import { v4 as uuidv4 } from 'uuid'

const exportJobs: Job[] = []
const importJobs: Job[] = []

const createJob = (request: Request, response: Response, jobs: Job[]) => {
  const { bookId, type } = request.body

  if (!bookId || !type) {
    response.status(400).json({ error: 'Invalid request body 5' })
    return
  }

  const job: Job = {
    id: uuidv4(),
    bookId,
    type,
    state: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  jobs.push(job)

  setTimeout(() => {
    job.state = 'finished'
    job.updatedAt = new Date()
  }, 2000)

  response.status(201).json(job)
}

const getJobs = (request: Request, response: Response, jobs: Job[]) => {
  response.status(200).json(jobs)
}

export const createExportJob = (request: Request, response: Response) =>
  createJob(request, response, exportJobs)

export const getExports = (request: Request, response: Response) =>
  getJobs(request, response, exportJobs)

export const createImportJob = (request: Request, response: Response) =>
  createJob(request, response, importJobs)

export const getImports = (request: Request, response: Response) =>
  getJobs(request, response, importJobs)
