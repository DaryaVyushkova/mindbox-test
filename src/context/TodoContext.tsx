import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import { Filter } from 'Forms/FilterForm'
import { Todo } from 'Forms/TodoForm'

interface TodoContextType {
  todos: Todo[]
  allTodos: Todo[]
  addTodo: (todo: Todo) => void
  toggleTodo: (id: number) => void
  clearCompleted: () => void
  clearAll: () => void
  deleteTodo: (id: number) => void
  filter: Filter
  setFilter: (filter: Filter) => void
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [filter, setFilter] = useState<Filter>(() => {
    const savedFilter = localStorage.getItem('filter')
    return savedFilter ? JSON.parse(savedFilter) : 'all'
  })

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [...prev, todo])
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }
  const clearAll = () => {
    setTodos([])
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('filter', JSON.stringify(filter))
  }, [todos, filter])

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        allTodos: todos,
        addTodo,
        toggleTodo,
        clearCompleted,
        clearAll,
        deleteTodo,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}

export { TodoProvider, useTodos }
