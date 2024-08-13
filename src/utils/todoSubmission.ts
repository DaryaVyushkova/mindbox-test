import { validateTodo } from 'utils/todoValidation'
import { ITodo } from 'Types/Todo'

export const attributesToSubmit = (
  newTodo: string,
  allTodos: ITodo[],
  addTodo: (todo: ITodo) => void,
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
