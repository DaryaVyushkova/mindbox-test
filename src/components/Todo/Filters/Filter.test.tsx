import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Filters from './Filters'
import { TodoContext, TodoContextType, useTodos } from 'context/TodoContext'
import { Filter, FilterStatus } from 'Types/Filter'

jest.mock('context/TodoContext', () => ({
  ...jest.requireActual('context/TodoContext'),
  useTodos: jest.fn(),
}))

const mockGetButtonType = jest.fn((filterValue: Filter) =>
  filterValue === FilterStatus.Active ? 'primary' : 'default'
)

jest.mock('Types/Todo', () => {
  const OriginalFilters = jest.requireActual('Forms/Todo').default
  return function MockedFilters(props: React.ComponentProps<typeof Filters>) {
    return <OriginalFilters {...props} getButtonType={mockGetButtonType} />
  }
})

describe('Filters', () => {
  const mockSetFilter = jest.fn()

  const renderWithContext = (filter: Filter) => {
    const contextValue: Partial<TodoContextType> = {
      filter,
      setFilter: mockSetFilter,
    }

    ;(useTodos as jest.MockedFunction<typeof useTodos>).mockReturnValue(
      contextValue as TodoContextType
    )

    return render(
      <TodoContext.Provider value={contextValue as TodoContextType}>
        <Filters />
      </TodoContext.Provider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders three filter buttons', () => {
    renderWithContext(FilterStatus.All)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  test('active filter button gets primary type', () => {
    renderWithContext(FilterStatus.Active)
    expect(mockGetButtonType(FilterStatus.Active)).toBe('primary')
  })

  test('inactive filter buttons get default type', () => {
    renderWithContext(FilterStatus.Active)
    expect(mockGetButtonType(FilterStatus.All)).toBe('default')
    expect(mockGetButtonType(FilterStatus.Completed)).toBe('default')
  })

  test.each([
    ['All', FilterStatus.All],
    ['Active', FilterStatus.Active],
    ['Completed', FilterStatus.Completed],
  ])('clicking button calls setFilter', (buttonText, filterValue) => {
    renderWithContext(FilterStatus.All)
    fireEvent.click(screen.getByText(buttonText))
    expect(mockSetFilter).toHaveBeenCalledWith(filterValue)
  })
})
