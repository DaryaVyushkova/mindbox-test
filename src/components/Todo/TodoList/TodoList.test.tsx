import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import TodoList from 'components/Todo/TodoList'

import * as TodoContextModule from 'context/TodoContext'

import { ITodo } from 'Types/Todo'
import { FilterStatus } from 'Types/Filter'
import { TodoContextType } from 'context/TodoContext'

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
    return <div data-testid="no-data-message">{message}</div>
  }
})

describe('TodoList', () => {
  const mockTodos: ITodo[] = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ]

  const renderWithContext = (
    todos: ITodo[],
    filter: FilterStatus = FilterStatus.All
  ) => {
    const allTodos = todos
    const itemsLeft = todos.filter((todo) => !todo.completed).length
    const mockContextValue: TodoContextType = {
      todos,
      allTodos,
      itemsLeft,
      filter,
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
      clearCompleted: jest.fn(),
      clearAll: jest.fn(),
      setFilter: jest.fn(),
      addTodo: jest.fn(), // Добавьте это свойство
    }

    console.log('Mock context value:', mockContextValue)
    ;(TodoContextModule.useTodos as jest.Mock).mockReturnValue(mockContextValue)

    return render(
      <TodoContextModule.TodoContext.Provider value={mockContextValue}>
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
    renderWithContext([], FilterStatus.All)
    expect(
      screen.getByText('Tasks have not yet been added')
    ).toBeInTheDocument()
  })

  test('renders "There are no active tasks" message when no todos and filter is active', () => {
    renderWithContext([], FilterStatus.Active)
    expect(screen.getByText('There are no active tasks')).toBeInTheDocument()
  })

  test('renders "There are no completed tasks" message when no todos and filter is completed', () => {
    renderWithContext([], FilterStatus.Completed)
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

  test('displays correct message when there are no tasks', () => {
    renderWithContext([])
    const noTodosMessage = screen.getByTestId('no-data-message')
    expect(noTodosMessage).toHaveTextContent('Tasks have not yet been added')
  })

  test('displays correct message when there are no active tasks', () => {
    renderWithContext([], FilterStatus.Active)
    const noTodosMessage = screen.getByTestId('no-data-message')
    expect(noTodosMessage).toHaveTextContent('There are no active tasks')
  })

  test('displays correct message when there are no completed tasks', () => {
    renderWithContext([], FilterStatus.Completed)
    const noTodosMessage = screen.getByTestId('no-data-message')
    expect(noTodosMessage).toHaveTextContent('There are no completed tasks')
  })
})
