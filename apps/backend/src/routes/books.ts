import { Router } from 'express'

import { list } from '@/controllers/books'

const router = Router()

router.get('/', list)

export default router
