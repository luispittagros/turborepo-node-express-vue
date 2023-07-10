import { NextFunction, Request, Response } from 'express'
import { BookExportRequest, BookImportRequest, Job, JobType } from 'reedsy-types'
import Joi from 'joi'
import { ReedsyRequest } from '@/types/request'

// Note: Could have used OOP, but I wanted to keep it simple.

type Jobs = Map<string, Job>

const exportJobs: Jobs = new Map<string, Job>()
const importJobs: Jobs = new Map<string, Job>()

const processingTimes: { [type: string]: number } = {
  epub: 10000,
  pdf: 25000,
  import: 60000
}

const processJob = (operation: JobType, job: Job) => {
  const jobs = operation === 'import' ? importJobs : exportJobs

  const timeout = operation === 'import' ? processingTimes['import'] : processingTimes[job.bookType]

  setTimeout(() => {
    job.state = 'finished'
    job.updatedAt = new Date()

    jobs.set(`${job.bookId}-${job.bookType}`, job)
  }, timeout)
}

const createJob = (
  operation: 'import' | 'export',
  params: BookExportRequest | BookImportRequest
): Job | undefined => {
  const jobs = operation === 'import' ? importJobs : exportJobs

  const job: Job = {
    bookId: params.bookId,
    bookType: params.type,
    url: 'url' in params ? params.url : undefined,
    state: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const compositeKey = `${job.bookId}-${job.bookType}`

  if (jobs.has(compositeKey)) {
    // throw new Error('Job already exists')
    return jobs.get(compositeKey)
  }

  jobs.set(compositeKey, job)

  processJob(operation, job)

  return job
}

const jobExportSchema = Joi.object({
  bookId: Joi.string().required(),
  type: Joi.string().required()
})

export const createExportJob = (
  request: ReedsyRequest<BookExportRequest>,
  response: Response,
  next: NextFunction
) => {
  const { error } = jobExportSchema.validate(request.body)

  if (error) {
    response.status(400).json({ error: error.details[0].message })
    return
  }

  const { bookId, type } = request.body

  try {
    const job = createJob('export', { bookId, type })
    response.status(201).json(job)
  } catch (error) {
    next(error)
  }
}

const jobImportSchema = Joi.object({
  bookId: Joi.string().required(),
  type: Joi.string().required(),
  url: Joi.string().required()
})

export const createImportJob = (
  request: Request<BookImportRequest>,
  response: Response,
  next: NextFunction
) => {
  const { error } = jobImportSchema.validate(request.body)

  if (error) {
    response.status(400).json({ error: error.details[0].message })
  }

  const { bookId, type, url } = request.body

  try {
    const job = createJob('import', {
      bookId,
      type,
      url
    })

    response.status(201).json(job)
  } catch (error) {
    next(error)
  }
}

const getJobs = (request: Request, response: Response, jobs: Jobs) => {
  response.status(200).json(jobs.entries())
}

export const getExports = (request: Request, response: Response) =>
  getJobs(request, response, exportJobs)

export const getImports = (request: Request, response: Response) =>
  getJobs(request, response, importJobs)
