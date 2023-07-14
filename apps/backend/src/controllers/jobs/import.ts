import { NextFunction, Response } from 'express'
import { BookImportRequestBody, BookType, JobType } from 'shared-types'
import Joi from 'joi'
import { AppRequest } from '@/types/request'
import { createJob, processJob } from '@/services/jobs'

const jobImportSchema = Joi.object({
  bookId: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(BookType.WORD, BookType.PDF, BookType.WATTPAD, BookType.EVERNOTE),
  url: Joi.string().required().uri()
})

export const createImportJob = (
  request: AppRequest<BookImportRequestBody>,
  response: Response,
  next: NextFunction
) => {
  const { error } = jobImportSchema.validate(request.body)

  if (error) {
    return response.status(400).json({ error: error.details[0].message })
  }

  const { bookId: id, type, url } = request.body

  try {
    const job = createJob(JobType.IMPORT, {
      id,
      type,
      url
    })

    if (!job) {
      return response.status(400).json({ error: 'Unable to create job' })
    }

    processJob(job)

    response.status(201).json(job)
  } catch (error) {
    next(error)
  }
}
