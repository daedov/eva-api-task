import express from 'express'
import morgan from 'morgan'
import cors from 'cors' // cuál es su función? 
import apiRoutes from './routes'

const app = express()

app.use(express.json()) // middleware que transforma req.body a json
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1', apiRoutes)
app.use((_req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Sorry... Not Found'
  })
})

export default app
