import { ITodo } from 'Types/Todo'

export const validateTodo = (newTodo: string, allTodos: ITodo[]): string => {
  if (!newTodo.trim()) {
    return 'Should have characters'
  }
  if (allTodos.some((todo) => todo.text === newTodo.trim())) {
    return 'This task already exists'
  }
  return ''
}
