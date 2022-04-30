// index.ts: llamada de todas las rutas en su conjunto
import { Router } from 'express'
import tokenValidator from '../middlewares/tokenValidator'
import healthRoutes from './healthRoutes'
import userRoutes from './userRoutes'
import taskRoutes from './taskRoutes'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/users', userRoutes) 
apiRoutes.use('/tasks', tokenValidator(), taskRoutes)

export default apiRoutes