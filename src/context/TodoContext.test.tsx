import { act, renderHook } from '@testing-library/react'
import { TodoProvider, useTodos } from './TodoContext'
import { FilterStatus } from 'features/todo/model/types/Filter'

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('TodoContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  test('Initializes with empty todos and "All" filter', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    expect(result.current.todos).toEqual([])
    expect(result.current.filter).toBe(FilterStatus.All)
  })

  test('Adds a todo', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Test todo', completed: false })
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Test todo')
  })

  test('Toggles a todo', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Test todo', completed: false })
      result.current.toggleTodo(1)
    })
    expect(result.current.todos[0].completed).toBe(true)
  })

  test('Clears completed todos', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: true })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: false })
      result.current.clearCompleted()
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Todo 2')
  })

  test('Clears all todos', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: false })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: false })
      result.current.clearAll()
    })
    expect(result.current.todos).toHaveLength(0)
  })

  test('Deletes a specific todo', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: false })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: false })
      result.current.deleteTodo(1)
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Todo 2')
  })

  test('Sets filter', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.setFilter(FilterStatus.Completed)
    })
    expect(result.current.filter).toBe(FilterStatus.Completed)
  })

  test('Calculates items left correctly', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: false })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: true })
      result.current.addTodo({ id: 3, text: 'Todo 3', completed: false })
    })
    expect(result.current.itemsLeft).toBe(2)
  })

  test('Saves to localStorage on state change', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Test todo', completed: false })
    })
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'todos',
      JSON.stringify([{ id: 1, text: 'Test todo', completed: false }])
    )
  })

  test('Loads from localStorage on initialization', () => {
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify([{ id: 1, text: 'Saved todo', completed: false }])
    )
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('Saved todo')
  })

  test('filters todos correctly', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: false })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: true })
      result.current.addTodo({ id: 3, text: 'Todo 3', completed: false })
    })

    act(() => {
      result.current.setFilter(FilterStatus.Active)
    })
    expect(result.current.todos).toHaveLength(2)
    expect(result.current.todos.every((todo) => !todo.completed)).toBe(true)

    act(() => {
      result.current.setFilter(FilterStatus.Completed)
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].completed).toBe(true)

    act(() => {
      result.current.setFilter(FilterStatus.All)
    })
    expect(result.current.todos).toHaveLength(3)
  })

  test('saves filter to localStorage', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.setFilter(FilterStatus.Active)
    })
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'filter',
      JSON.stringify(FilterStatus.Active)
    )
  })

  test('loads filter from localStorage on initialization', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'filter') return JSON.stringify(FilterStatus.Completed)
      return null
    })
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    expect(result.current.filter).toBe(FilterStatus.Completed)
  })

  test('filters todos correctly for all filter types', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: false })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: true })
      result.current.addTodo({ id: 3, text: 'Todo 3', completed: false })
    })

    act(() => {
      result.current.setFilter(FilterStatus.All)
    })
    expect(result.current.todos).toHaveLength(3)
    expect(result.current.todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, completed: false }),
        expect.objectContaining({ id: 2, completed: true }),
        expect.objectContaining({ id: 3, completed: false }),
      ])
    )

    act(() => {
      result.current.setFilter(FilterStatus.Active)
    })
    expect(result.current.todos).toHaveLength(2)
    expect(result.current.todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, completed: false }),
        expect.objectContaining({ id: 3, completed: false }),
      ])
    )
    expect(result.current.todos.every((todo) => !todo.completed)).toBe(true)

    act(() => {
      result.current.setFilter(FilterStatus.Completed)
    })
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0]).toEqual(
      expect.objectContaining({ id: 2, completed: true })
    )
    expect(result.current.todos.every((todo) => todo.completed)).toBe(true)
  })

  test('returns all todos for unknown filter', () => {
    const { result } = renderHook(() => useTodos(), { wrapper: TodoProvider })
    act(() => {
      result.current.addTodo({ id: 1, text: 'Todo 1', completed: false })
      result.current.addTodo({ id: 2, text: 'Todo 2', completed: true })
      result.current.addTodo({ id: 3, text: 'Todo 3', completed: false })
      // @ts-expect-error - передаю неверный тип фильтра для теста
      result.current.setFilter('UNKNOWN_FILTER')
    })

    expect(result.current.todos).toHaveLength(3)
    expect(result.current.todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, completed: false }),
        expect.objectContaining({ id: 2, completed: true }),
        expect.objectContaining({ id: 3, completed: false }),
      ])
    )
  })
})
