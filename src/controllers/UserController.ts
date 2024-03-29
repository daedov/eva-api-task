import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt";
import UserRepository from "../models/repositories/UserRepository";
import { RegisterUserDTO } from "../models/dto/UserDTO";
import { loginSchema, registerSchema } from "../models/validators/userSchemas";

const answerError = "Something went wrong";
const answerUserExist = "User already exists";

export default class UserController {

  public readonly login = async (req: Request, res: Response) => {
    const credentials = req.body;
    try {
      await loginSchema.validateAsync(credentials);
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    const repository = new UserRepository();
    try {
      const user = await repository.findByEmail(credentials.email);
      if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: answerError });
    }
  };

  public readonly register = async (req: Request, res: Response) => {
    const user = req.body as RegisterUserDTO;
    const repository = new UserRepository();
    try {
      await registerSchema.validateAsync(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    try {
      const newUser = await repository.create({
        ...user,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (error) {
      if (error.code === "P2002") {
        res.status(409).json({ message: answerUserExist });
        return;
      }
      res.status(500).json({ message: answerError });
    }
  };
}
