import { Router } from 'express'

import { createImportJob, createExportJob, getImports, getExports } from '@/controllers/jobs'

const router = Router()

router.post('/import', createImportJob)

router.post('/export', createExportJob)

router.get('/import', getImports)

router.get('/export', getExports)

export default router
