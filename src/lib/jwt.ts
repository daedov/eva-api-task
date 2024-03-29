import jwt from 'jsonwebtoken'
import { UserDTO, UserTokenPayload } from '../models/dto/UserDTO'

const secret = process.env.JWT_SECRET as string
if(!secret){
  throw new Error('Invalid secret')
}
export function generateToken(user: UserDTO): string {
  return jwt.sign(
    { sub: user.id, email: user.email}, 
    secret,
    { expiresIn: '7d' } // tiempo de expiración del token
  )
}
export function verifyToken(token: string): UserTokenPayload {
  const verified = jwt.verify(token, secret)
  return verified as unknown as UserTokenPayload
}