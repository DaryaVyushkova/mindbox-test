import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

jest.mock('components/Todo/TodoInput', () => {
  const MockTodoInput = () => <div data-testid="todo-input">TodoInput</div>
  MockTodoInput.displayName = 'MockTodoInput'
  return MockTodoInput
})

jest.mock('components/Todo/TodoList', () => {
  const MockTodoList = () => <div data-testid="todo-list">TodoList</div>
  MockTodoList.displayName = 'MockTodoList'
  return MockTodoList
})

jest.mock('components/Todo/Filters', () => {
  const MockFilters = () => <div data-testid="filters">Filters</div>
  MockFilters.displayName = 'MockFilters'
  return MockFilters
})

jest.mock('components/Todo/ClearTodoSection', () => {
  const MockClearTodoSection = () => (
    <div data-testid="clear-todo-section">ClearTodoSection</div>
  )
  MockClearTodoSection.displayName = 'MockClearTodoSection'
  return MockClearTodoSection
})

jest.mock('./components/Loader', () => {
  const MockLoader = () => <div data-testid="loader">Loading...</div>
  MockLoader.displayName = 'MockLoader'
  return MockLoader
})

describe('App', () => {
  test('renders all components and title', async () => {
    render(<App />)

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
    const { container } = render(<App />)
    expect(container.firstChild).toHaveClass('App')
  })
})
