import { expect } from 'chai'
import sinon, { SinonFakeTimers } from 'sinon'
import { v4 as uuid } from 'uuid'
import { createJob, processJob, getGroupedJobs } from '@/services/jobs'
import { JobType, BookType, JobState } from 'reedsy-types'

describe('Jobs Service', () => {
  let clock: SinonFakeTimers

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
    sinon.restore()
  })

  it('should create a job', () => {
    const book = { id: uuid(), type: BookType.EPUB }
    const job = createJob(JobType.EXPORT, book)

    expect(job).to.have.property('id')
    expect(job).to.have.property('book', book)
    expect(job).to.have.property('type', JobType.EXPORT)
    expect(job).to.have.property('state', JobState.PENDING)
  })

  it('should process a job', async () => {
    const book = { id: uuid(), type: BookType.EPUB }
    const job = createJob(JobType.EXPORT, book)

    processJob(job)

    // Tick the clock forward by 10 seconds (the processing time for an EPUB export job)
    clock.tick(10000)

    expect(job).to.have.property('state', JobState.FINISHED)
  })

  it('should throw an error when processing an unsupported job', () => {
    const book = { id: uuid(), type: BookType.WORD }
    const job = createJob(JobType.EXPORT, book)

    expect(() => processJob(job)).to.throw(`Unable to process job ${job.id}`)
  })

  it('should get grouped jobs', () => {
    const book1 = { id: uuid(), type: BookType.EPUB }
    const book2 = { id: uuid(), type: BookType.PDF }

    const job1 = createJob(JobType.EXPORT, book1)
    const job2 = createJob(JobType.EXPORT, book2)

    processJob(job1)

    // Tick the clock forward by 10 seconds (the processing time for an EPUB export job)
    clock.tick(10000)

    const groupedJobs = getGroupedJobs(JobType.EXPORT)

    expect(groupedJobs).to.have.property(JobState.PENDING).that.includes(job2)
    expect(groupedJobs).to.have.property(JobState.FINISHED).that.includes(job1)
  })

  it('should not duplicate a job', () => {
    const book = { id: uuid(), type: BookType.EPUB }
    const job1 = createJob(JobType.EXPORT, book)
    const job2 = createJob(JobType.EXPORT, book)

    expect(job1).to.eql(job2)
  })
})
