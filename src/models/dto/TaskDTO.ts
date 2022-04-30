// definición de contratos (cómo la data debe venir y cómo se devuelve)
// cada interfaz debe hacer cosas distintas, tienen responsabilidad única 

// DTO base, desde donde se parte para construir otras
export interface BaseTaskDTO {
  id?: number 
  title: string
  content: string
  done: boolean
}
// respuesta de la api cuando se piden los task
export interface TaskDTO extends BaseTaskDTO {
  id: number
  userId: number | null
}
// se deja por si más adelante se necesita extender la interfaz 
export interface CreateTaskDTO extends BaseTaskDTO {}
// partial: convierte los atributos de BaseTask en no obligatorios
export interface UpdateTaskDTO extends Partial<BaseTaskDTO> {}
