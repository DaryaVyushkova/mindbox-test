import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoInput from './TodoInput'

import { TodoContext, useTodos } from 'context/TodoContext'

import { Filter, FilterStatus } from 'Types/Filter'
import { ITodo } from 'Types/Todo'

import { submitTodoAttributes } from 'utils/todoSubmission'

jest.mock('utils/todoSubmission', () => ({
  defaultAttributes: {
    newTodo: '',
    error: '',
  },
  submitTodoAttributes: jest.fn(),
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
  deleteTodo: jest.fn(),
  filter: FilterStatus.All as Filter,
  setFilter: jest.fn(),
  itemsLeft: 0,
  ...overrides,
})

describe('TodoInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    window.gtag = jest.fn()
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

      expect(submitTodoAttributes).not.toHaveBeenCalled()
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

      expect(submitTodoAttributes).toHaveBeenCalledWith(
        'New Todo',
        [],
        mockAddTodo,
        expect.any(Function),
        expect.any(Function)
      )
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'add_todo',
        expect.any(Object)
      )
    })
  })

  describe('Input behavior', () => {
    test('input field is cleared after adding a todo', () => {
      ;(submitTodoAttributes as jest.Mock).mockImplementation(
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
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'add_todo',
        expect.any(Object)
      )
    })

    test('adds todo when Enter key is pressed', () => {
      ;(submitTodoAttributes as jest.Mock).mockImplementation(
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

      expect(submitTodoAttributes).toHaveBeenCalled()
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'add_todo',
        expect.any(Object)
      )
    })
  })

  describe('Error handling', () => {
    test('displays error message when trying to add a duplicate todo', () => {
      const existingTodo: ITodo = {
        id: 1,
        text: 'Existing Todo',
        completed: false,
      }
      ;(submitTodoAttributes as jest.Mock).mockImplementation(
        (newTodo, allTodos, addTodo, setError, setNewTodo) => {
          if (allTodos.some((todo: ITodo) => todo.text === newTodo)) {
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
      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'add_todo',
        expect.any(Object)
      )
    })
  })
})
