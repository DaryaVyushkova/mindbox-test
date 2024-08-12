import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TodoList from 'components/Todo/TodoList'

import * as TodoContextModule from 'context/TodoContext'

import { Todo } from 'Forms/TodoForm'

jest.mock('context/TodoContext', () => ({
  ...jest.requireActual('context/TodoContext'),
  useTodos: jest.fn(),
}))

jest.mock('components/Todo/TodoItem', () => {
  return function MockTodoItem({ text }: { text: string }) {
    return <li>{text}</li>
  }
})

jest.mock('components/NoDataMessage', () => {
  return function MockNoDataMessage({ message }: { message: string }) {
    return <div>{message}</div>
  }
})

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ]

  const renderWithContext = (
    todos: Todo[],
    filter: 'all' | 'active' | 'completed' = 'all'
  ) => {
    ;(TodoContextModule.useTodos as jest.Mock).mockReturnValue({
      todos,
      filter,
    })
    return render(
      <TodoContextModule.TodoContext.Provider value={{ todos, filter } as any}>
        <TodoList />
      </TodoContextModule.TodoContext.Provider>
    )
  }

  test('renders list of todos when todos are present', () => {
    renderWithContext(mockTodos)
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  test('renders "Tasks have not yet been added" message when no todos and filter is all', () => {
    renderWithContext([], 'all')
    expect(
      screen.getByText('Tasks have not yet been added')
    ).toBeInTheDocument()
  })

  test('renders "There are no active tasks" message when no todos and filter is active', () => {
    renderWithContext([], 'active')
    expect(screen.getByText('There are no active tasks')).toBeInTheDocument()
  })

  test('renders "There are no completed tasks" message when no todos and filter is completed', () => {
    renderWithContext([], 'completed')
    expect(screen.getByText('There are no completed tasks')).toBeInTheDocument()
  })

  test('renders correct number of TodoItem components', () => {
    renderWithContext(mockTodos)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })

  test('does not render NoDataMessage when todos are present', () => {
    renderWithContext(mockTodos)
    expect(
      screen.queryByText('Tasks have not yet been added')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no active tasks')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no completed tasks')
    ).not.toBeInTheDocument()
  })
})
