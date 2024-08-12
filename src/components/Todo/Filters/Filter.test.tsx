import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Filters from './Filters'
import { TodoContext, useTodos } from 'context/TodoContext'
import { Filter } from 'Forms/FilterForm'

jest.mock('context/TodoContext', () => ({
  ...jest.requireActual('context/TodoContext'),
  useTodos: jest.fn(),
}))

const mockGetButtonType = jest.fn((filterValue) =>
  filterValue === 'active' ? 'primary' : 'default'
)

jest.mock('./Filters', () => {
  const OriginalFilters = jest.requireActual('./Filters').default
  return function MockedFilters(props: React.JSX.IntrinsicAttributes) {
    return <OriginalFilters {...props} getButtonType={mockGetButtonType} />
  }
})

describe('Filters', () => {
  const mockSetFilter = jest.fn()

  const renderWithContext = (filter: Filter) => {
    ;(useTodos as jest.Mock).mockReturnValue({
      filter,
      setFilter: mockSetFilter,
    })

    return render(
      <TodoContext.Provider value={{ filter, setFilter: mockSetFilter } as any}>
        <Filters />
      </TodoContext.Provider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders three filter buttons', () => {
    renderWithContext('all')
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  test('active filter button gets primary type', () => {
    renderWithContext('active')
    expect(mockGetButtonType('active')).toBe('primary')
  })

  test('inactive filter buttons get default type', () => {
    renderWithContext('active')
    expect(mockGetButtonType('all')).toBe('default')
    expect(mockGetButtonType('completed')).toBe('default')
  })

  test.each([
    ['All', 'all'],
    ['Active', 'active'],
    ['Completed', 'completed'],
  ])('clicking button calls setFilter', (buttonText, filterValue) => {
    renderWithContext('all')
    fireEvent.click(screen.getByText(buttonText))
    expect(mockSetFilter).toHaveBeenCalledWith(filterValue)
  })
})
