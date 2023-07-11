import { Request, Response } from 'express'
import { JobType } from 'reedsy-types'
import { getGroupedJobs } from '@/services/jobs'

export const getExports = (request: Request, response: Response) => {
  const groupedJobs = getGroupedJobs(JobType.EXPORT)

  if (!groupedJobs) {
    return response.status(404).json({ error: 'No jobs found' })
  }

  response.status(200).json(groupedJobs)
}

export const getImports = (request: Request, response: Response) => {
  const groupedJobs = getGroupedJobs(JobType.IMPORT)

  if (!groupedJobs) {
    return response.status(404).json({ error: 'No jobs found' })
  }

  response.status(200).json(groupedJobs)
}
