import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import ClearTodoSection from 'components/Todo/ClearTodoSection'

import { TodoContext, useTodos } from 'context/TodoContext'

import { Todo } from 'Forms/TodoForm'

jest.mock('context/TodoContext', () => ({
  ...jest.requireActual('context/TodoContext'),
  useTodos: jest.fn(),
}))

describe('ClearTodoSection', () => {
  const mockClearCompleted = jest.fn()
  const mockClearAll = jest.fn()

  const renderWithContext = (todos: Todo[]) => {
    ;(useTodos as jest.Mock).mockReturnValue({
      todos,
      clearCompleted: mockClearCompleted,
      clearAll: mockClearAll,
    })

    return render(
      <TodoContext.Provider
        value={
          {
            todos,
            clearCompleted: mockClearCompleted,
            clearAll: mockClearAll,
          } as any
        }
      >
        <ClearTodoSection />
      </TodoContext.Provider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders both buttons', () => {
    renderWithContext([])
    expect(screen.getByText('Delete Completed')).toBeInTheDocument()
    expect(screen.getByText('Delete All')).toBeInTheDocument()
  })

  test('both buttons are disabled when there are no todos', () => {
    renderWithContext([])
    fireEvent.click(screen.getByText('Delete Completed'))
    fireEvent.click(screen.getByText('Delete All'))
    expect(mockClearCompleted).not.toHaveBeenCalled()
    expect(mockClearAll).not.toHaveBeenCalled()
  })

  test('Delete Completed is enabled when there are completed todos', () => {
    renderWithContext([
      { id: 1, text: 'Todo 1', completed: true },
      { id: 2, text: 'Todo 2', completed: false },
    ])
    fireEvent.click(screen.getByText('Delete Completed'))
    expect(mockClearCompleted).toHaveBeenCalled()
  })

  test('Delete Completed is disabled when there are no completed todos', () => {
    renderWithContext([
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: false },
    ])
    fireEvent.click(screen.getByText('Delete Completed'))
    expect(mockClearCompleted).not.toHaveBeenCalled()
  })

  test('Delete All is enabled when there are todos', () => {
    renderWithContext([{ id: 1, text: 'Todo 1', completed: false }])
    fireEvent.click(screen.getByText('Delete All'))
    expect(mockClearAll).toHaveBeenCalled()
  })

  test('Delete All is disabled when there are no todos', () => {
    renderWithContext([])
    fireEvent.click(screen.getByText('Delete All'))
    expect(mockClearAll).not.toHaveBeenCalled()
  })
})
