import { Router } from 'express'
import UserController from '../controllers/UserController'

const userRoutes = Router()
const controller = new UserController()

userRoutes.post('/login', controller.login)
userRoutes.post('/register', controller.register)

export default userRoutes