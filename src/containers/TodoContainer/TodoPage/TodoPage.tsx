import React, { Suspense, lazy } from 'react'

import { TodoProvider } from 'context/TodoContext'
import Loader from 'shared/components/Loader'

const lazyComponents = {
  TodoInput: lazy(() => import('./components/TodoInput')),
  TodoList: lazy(() => import('./components/TodoList')),
  Filters: lazy(() => import('./components/Filters')),
  ClearTodoSection: lazy(() => import('./components/ClearTodoSection')),
}

const TodoPage: React.FC = () => {
  return (
    <TodoProvider>
      <div className="App">
        <h1>Todos</h1>
        <Suspense fallback={<Loader />}>
          {Object.entries(lazyComponents).map(([name, Component]) => (
            <Component key={name} />
          ))}
        </Suspense>
      </div>
    </TodoProvider>
  )
}

export default TodoPage
