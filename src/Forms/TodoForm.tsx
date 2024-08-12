export interface Todo {
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

export const validateTodo = (newTodo: string, allTodos: Todo[]): string => {
  if (!newTodo.trim()) {
    return 'Should have characters'
  }
  if (allTodos.some((todo) => todo.text === newTodo.trim())) {
    return 'This task already exists'
  }
  return ''
}

export const attributesToSubmit = (
  newTodo: string,
  allTodos: Todo[],
  addTodo: (todo: { id: number; text: string; completed: boolean }) => void,
  setError: (error: string) => void,
  setNewTodo: (value: string) => void
) => {
  const error = validateTodo(newTodo, allTodos)
  if (error) {
    setError(error)
  } else {
    addTodo({
      id: Date.now(),
      text: newTodo,
      completed: false,
    })
    setNewTodo('')
  }
}
