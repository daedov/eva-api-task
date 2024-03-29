import { PrismaClient } from "@prisma/client";
import { RegisterUserDTO, LoginUserDTO, UserDTO } from "../dto/UserDTO";

const prisma = new PrismaClient()

export default class UserRepository {
  public readonly findAll = async (): Promise<UserDTO[]> => {
    const users = await prisma.user.findMany()
    return users
  }

  public readonly findById = async (id: number): Promise<UserDTO | undefined> => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!user) return
    return user
  }
  
  public readonly findByEmail = async (email: string): Promise<LoginUserDTO | undefined>  => {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) return
    return user
  }
  
  public readonly create = async (user: RegisterUserDTO): Promise<UserDTO> => {
    const newUser = await prisma.user.create({
      data: user
    })
    return newUser
  }
}



