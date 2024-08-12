import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoInput from './TodoInput'
import { TodoContext, useTodos } from 'context/TodoContext'
import { Filter } from 'Forms/FilterForm'
import * as TodoForm from 'Forms/TodoForm'
import { Todo } from 'Forms/TodoForm'

jest.mock('@/Forms/TodoForm', () => ({
  defaultAttributes: {
    newTodo: '',
    error: '',
  },
  attributesToSubmit: jest.fn(),
}))

type TodoContextType = ReturnType<typeof useTodos>

const createMockContext = (
  overrides: Partial<TodoContextType> = {}
): TodoContextType => ({
  addTodo: jest.fn(),
  todos: [],
  allTodos: [],
  toggleTodo: jest.fn(),
  clearCompleted: jest.fn(),
  clearAll: jest.fn(),
  filter: 'all' as Filter,
  setFilter: jest.fn(),
  ...overrides,
})

describe('TodoInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('renders input and button', () => {
      render(
        <TodoContext.Provider value={createMockContext()}>
          <TodoInput />
        </TodoContext.Provider>
      )

      expect(
        screen.getByPlaceholderText('What needs to be done?')
      ).toBeInTheDocument()
      expect(screen.getByText('Add')).toBeInTheDocument()
    })
  })

  describe('Button behavior', () => {
    test('button is disabled when input is empty', () => {
      render(
        <TodoContext.Provider value={createMockContext()}>
          <TodoInput />
        </TodoContext.Provider>
      )

      const addButton = screen.getByText('Add')
      fireEvent.click(addButton)

      expect(TodoForm.attributesToSubmit).not.toHaveBeenCalled()
    })

    test('button triggers action when input has text', () => {
      const mockAddTodo = jest.fn()
      render(
        <TodoContext.Provider
          value={createMockContext({ addTodo: mockAddTodo })}
        >
          <TodoInput />
        </TodoContext.Provider>
      )

      const input = screen.getByPlaceholderText('What needs to be done?')
      const addButton = screen.getByText('Add')

      fireEvent.change(input, { target: { value: 'New Todo' } })
      fireEvent.click(addButton)

      expect(TodoForm.attributesToSubmit).toHaveBeenCalledWith(
        'New Todo',
        [],
        mockAddTodo,
        expect.any(Function),
        expect.any(Function)
      )
    })
  })

  describe('Input behavior', () => {
    test('input field is cleared after adding a todo', () => {
      ;(TodoForm.attributesToSubmit as jest.Mock).mockImplementation(
        (newTodo, allTodos, addTodo, setError, setNewTodo) => {
          addTodo({ id: 1, text: newTodo, completed: false })
          setNewTodo('')
        }
      )

      render(
        <TodoContext.Provider value={createMockContext()}>
          <TodoInput />
        </TodoContext.Provider>
      )

      const input = screen.getByPlaceholderText('What needs to be done?')
      const addButton = screen.getByText('Add')

      fireEvent.change(input, { target: { value: 'New Todo' } })
      fireEvent.click(addButton)

      expect(input).toHaveValue('')
    })

    test('adds todo when Enter key is pressed', () => {
      ;(TodoForm.attributesToSubmit as jest.Mock).mockImplementation(
        (newTodo, allTodos, addTodo, setError, setNewTodo) => {
          addTodo({ id: Date.now(), text: newTodo, completed: false })
          setNewTodo('')
        }
      )

      render(
        <TodoContext.Provider value={createMockContext()}>
          <TodoInput />
        </TodoContext.Provider>
      )

      const input = screen.getByPlaceholderText('What needs to be done?')

      fireEvent.change(input, { target: { value: 'New Todo' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 })

      expect(TodoForm.attributesToSubmit).toHaveBeenCalled()
    })
  })

  describe('Error handling', () => {
    test('displays error message when trying to add a duplicate todo', () => {
      const existingTodo: Todo = {
        id: 1,
        text: 'Existing Todo',
        completed: false,
      }
      ;(TodoForm.attributesToSubmit as jest.Mock).mockImplementation(
        (newTodo, allTodos, addTodo, setError, setNewTodo) => {
          if (allTodos.some((todo: Todo) => todo.text === newTodo)) {
            setError('This todo already exists!')
          } else {
            addTodo({ id: Date.now(), text: newTodo, completed: false })
            setNewTodo('')
          }
        }
      )

      render(
        <TodoContext.Provider
          value={createMockContext({
            todos: [existingTodo],
            allTodos: [existingTodo],
          })}
        >
          <TodoInput />
        </TodoContext.Provider>
      )

      const input = screen.getByPlaceholderText('What needs to be done?')
      const addButton = screen.getByText('Add')

      fireEvent.change(input, { target: { value: 'Existing Todo' } })
      fireEvent.click(addButton)

      expect(screen.getByText('This todo already exists!')).toBeInTheDocument()
      expect(input).toHaveValue('Existing Todo')
    })
  })
})
