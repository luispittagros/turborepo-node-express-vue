import { BookType, Job, JobBook, JobState, JobType } from 'shared-types'
import jobs from '@/models/jobs'
import { v4 as uuid } from 'uuid'

const processingTimes: Record<JobType, Record<BookType, number | undefined>> = {
  [JobType.EXPORT]: {
    [BookType.EPUB]: 10,
    [BookType.PDF]: 25,
    [BookType.WORD]: undefined,
    [BookType.WATTPAD]: undefined,
    [BookType.EVERNOTE]: undefined
  },
  [JobType.IMPORT]: {
    [BookType.WORD]: 60,
    [BookType.PDF]: 60,
    [BookType.WATTPAD]: 60,
    [BookType.EPUB]: undefined,
    [BookType.EVERNOTE]: 60
  }
}

const getJobKey = (job: Job) => `${job.book.id}-${job.book.type}-${job.type}`

export const processJob = (job: Job) => {
  if (job.state === JobState.FINISHED) return

  const processingTime = processingTimes[job.type][job.book.type]

  if (processingTime === undefined) {
    throw new Error(`Unable to process job ${job.id}`)
  }

  setTimeout(() => {
    job.state = JobState.FINISHED
    job.updatedAt = new Date()

    jobs.set(getJobKey(job), job)
  }, processingTime * 1000)
}

export const createJob = (type: JobType, book: JobBook): Job => {
  const job: Job = {
    id: uuid(),
    book,
    type,
    state: JobState.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const jobKey = getJobKey(job)
  const existingJob = jobs.get(jobKey)

  if (existingJob) return existingJob

  jobs.set(jobKey, job)

  return job
}

export const getStateGroupedJobs = (type: JobType) => {
  const groupedJobs: Record<JobState, Job[]> = {
    [JobState.PENDING]: [],
    [JobState.FINISHED]: [],
    [JobState.ERROR]: []
  }

  jobs.forEach((job) => {
    if (job.type !== type) return

    const group = groupedJobs[job.state] || []
    group.push(job)

    groupedJobs[job.state] = group
  })

  return groupedJobs
}
