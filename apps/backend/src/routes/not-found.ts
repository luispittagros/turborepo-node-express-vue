import { Router } from 'express'

const router = Router()

router.get('*', (req, res) => res.status(404).json('404 Not Found'))

export default router
