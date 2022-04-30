export interface BaseUserDTO {
  id?: number
  firstName: string
  lastName: string
  email: string
}
// respuesta de la api cuando se pide un usuario 
export interface UserDTO extends BaseUserDTO {
  id: number
}
// todos los datos requeridos y se agrega la contraseña
export interface RegisterUserDTO extends BaseUserDTO {
  password: string
}
export interface LoginUserDTO extends UserDTO {
  password: string
}
export interface UserTokenPayload {
  sub: number
  email: string
  exp: number
  iat: number
}
