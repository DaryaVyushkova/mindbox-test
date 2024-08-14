import { validateTodo } from 'features/todo/model/utils/todoValidation'
import { ITodo } from 'features/todo/model/Todo'

export const submitTodoAttributes = (
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
