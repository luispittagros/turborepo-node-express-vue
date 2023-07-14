import { NextFunction, Response } from 'express'
import { BookExportRequestBody, BookType, JobType } from 'shared-types'
import Joi from 'joi'
import { AppRequest } from '@/types/request'
import { createJob, processJob } from '@/services/jobs'

const jobExportSchema = Joi.object({
  bookId: Joi.string().required(),
  type: Joi.string().required().valid(BookType.EPUB, BookType.PDF)
})

export const createExportJob = (
  request: AppRequest<BookExportRequestBody>,
  response: Response,
  next: NextFunction
) => {
  const { error } = jobExportSchema.validate(request.body)

  if (error) {
    return response.status(400).json({ error: error.details[0].message })
  }

  const { bookId: id, type } = request.body

  try {
    const job = createJob(JobType.EXPORT, { id, type })

    if (!job) {
      return response.status(400).json({ error: 'Unable to create job' })
    }

    processJob(job)

    response.status(201).json(job)
  } catch (error) {
    next(error)
  }
}
