import React, { Suspense, lazy } from 'react'

import { TodoProvider } from 'context/TodoContext'
import Loader from './components/Loader'

import './styles.css'

const lazyComponents = {
  TodoInput: lazy(() => import('components/Todo/TodoInput')),
  TodoList: lazy(() => import('components/Todo/TodoList')),
  Filters: lazy(() => import('components/Todo/Filters')),
  ClearTodoSection: lazy(() => import('components/Todo/ClearTodoSection')),
}

const App: React.FC = () => {
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

export default App
