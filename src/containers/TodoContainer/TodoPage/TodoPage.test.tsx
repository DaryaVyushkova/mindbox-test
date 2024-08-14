import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoPage from './TodoPage'

jest.mock('./components/TodoInput', () => {
  const MockTodoInput = () => <div data-testid="todo-input">TodoInput</div>
  MockTodoInput.displayName = 'MockTodoInput'
  return MockTodoInput
})

jest.mock('./components/TodoList', () => {
  const MockTodoList = () => <div data-testid="todo-list">TodoList</div>
  MockTodoList.displayName = 'MockTodoList'
  return MockTodoList
})

jest.mock('./components/Filters', () => {
  const MockFilters = () => <div data-testid="filters">Filters</div>
  MockFilters.displayName = 'MockFilters'
  return MockFilters
})

jest.mock('./components/ClearTodoSection', () => {
  const MockClearTodoSection = () => (
    <div data-testid="clear-todo-section">ClearTodoSection</div>
  )
  MockClearTodoSection.displayName = 'MockClearTodoSection'
  return MockClearTodoSection
})

jest.mock('shared/components/Loader', () => {
  const MockLoader = () => <div data-testid="loader">Loading...</div>
  MockLoader.displayName = 'MockLoader'
  return MockLoader
})

describe('App', () => {
  test('renders all components and title', async () => {
    render(<TodoPage />)

    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByTestId('loader')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByTestId('todo-input')).toBeInTheDocument()
      expect(screen.getByTestId('todo-list')).toBeInTheDocument()
      expect(screen.getByTestId('filters')).toBeInTheDocument()
      expect(screen.getByTestId('clear-todo-section')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  })

  test('TodoProvider wraps the application', () => {
    const { container } = render(<TodoPage />)
    expect(container.firstChild).toHaveClass('App')
  })
})
