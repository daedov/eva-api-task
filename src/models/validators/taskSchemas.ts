import Joi from 'joi'
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/TaskDTO'

// creación de task
export const createTaskSchema: Joi.ObjectSchema<CreateTaskDTO> = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
})
// actualización de task
export const updateTaskSchema: Joi.ObjectSchema<UpdateTaskDTO> = Joi.object().keys({
  title: Joi.string(),
  content: Joi.string(),
  done: Joi.boolean()
})
