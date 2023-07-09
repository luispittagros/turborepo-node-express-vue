import 'dotenv/config'

import express from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import routes from '@/routes/index'

export const app = express()

app.use(cors())
app.use(json())
app.use(compression())

app.use('/', routes)

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
