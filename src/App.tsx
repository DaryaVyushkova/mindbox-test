import React from 'react'

import { TodoProvider } from 'context/TodoContext'

import TodoInput from 'components/Todo/TodoInput'
import TodoList from 'components/Todo/TodoList'
import Filters from 'components/Todo/Filters'
import ClearTodoSection from 'components/Todo/ClearTodoSection'

import './styles.css'

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="App">
        <h1>Todos</h1>
        <TodoInput />
        <TodoList />
        <Filters />
        <ClearTodoSection />
      </div>
    </TodoProvider>
  )
}

export default App
