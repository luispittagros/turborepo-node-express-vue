import { Router } from 'express'

import books from '@/routes/books'
import jobs from '@/routes/jobs'
import NotFound from '@/routes/not-found'

const router = Router()

router.use('/jobs', jobs)
router.use('/books', books)

router.use(NotFound)

export default router
