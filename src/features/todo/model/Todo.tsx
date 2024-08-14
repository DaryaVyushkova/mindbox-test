export interface ITodo {
  id: number
  text: string
  completed: boolean
}

export interface TodoFormAttributes {
  newTodo: string
  error: string
}

export const defaultAttributes: TodoFormAttributes = {
  newTodo: '',
  error: '',
}
