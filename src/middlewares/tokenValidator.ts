import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../lib/jwt'

const answerMessage = 'Missing authorization header'

export default function tokenValidator() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.status(401).json({ message: answerMessage })
      return
    }
    const [bearer, token] = authHeader.split(' ')
    if(bearer !== 'Bearer'){
      res.status(401).json({ message: 'Invalid token'})
      return
    }
    try {
      const tokenPayload = verifyToken(token)
      req.user = tokenPayload
    } catch (error) {
      res.status(401).json({ message: answerMessage })
      return
    }
    return next()
  }
}