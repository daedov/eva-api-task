import type { Request, Response } from 'express'
import type { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from '../models/dto/TaskDTO'
import { UserTokenPayload } from '../models/dto/UserDTO'
import TaskRepository from '../models/repositories/TaskRepository'
import { createTaskSchema, updateTaskSchema } from '../models/validators/taskSchemas'

const answerError = 'Something went wrong'
const answerNoTask = 'Task not found'
const answerTaskExist = 'Task already exists'
const answerNoPermission = 'You do not have permisson'

export default class TaskController {
  public readonly getAll = async (req: Request, res: Response) => {
    try {
      const user = req.user as UserTokenPayload
      const repository = new TaskRepository(user.sub)
      const tasks: TaskDTO[] = await repository.findAll()
      res.json(tasks)
    } catch(error) {
      console.log(error.message)
      res.status(500).json({ message: answerError })
    }
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    const task = await repository.findById(parseInt(id))

    if (!task) {
      res.status(404).json({ message: answerNoTask })
      return
    }
    if (task.userId !== user.sub){
      res.status(403).json({ message: answerNoPermission})
      return
    }
    res.json(task)
  }

  public readonly create = async (req: Request, res: Response) => {
    const task: CreateTaskDTO = req.body
    try {
      await createTaskSchema.validateAsync(task)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    try {
      const newTask = await repository.create(task)
      res.status(201).json(newTask)
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(409).json({ message: answerTaskExist })
        return
      }
      console.log(error)
      res.status(500).json({ message: answerError })
    }
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const task: UpdateTaskDTO = req.body
    try {
      await updateTaskSchema.validateAsync(task)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    try {
      const taskDb = await repository.findById(parseInt(id))
      if (!taskDb){
        res.status(404).json({ message: answerNoTask})
      }
      if (taskDb?.userId !== user.sub){
        res.status(403).json({ message: answerNoPermission })
        return
      }
      await repository.update(parseInt(id), task)
      res.sendStatus(204)
    } catch (error) {
      if (error.code === 'P2002') {
        res.status(409).json({ message: answerTaskExist })
        return
      }
      console.log(error)
      res.status(500).json({ message: answerError })
    }
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)

    try {
      const taskDb = await repository.findById(parseInt(id))
      if(!taskDb){
        res.status(404).json({ message: answerNoTask })
        return
      }
      if(taskDb.userId !== user.sub){
        res.status(403).json({ message: answerNoPermission})
        return
      }
      await repository.delete(parseInt(id))
      res.sendStatus(204)
    } catch (error){
      console.log(error)
      res.status(500).json({ message: answerError})
    }
  }
}
