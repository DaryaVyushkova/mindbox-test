import React from 'react'
import { isEmpty } from 'ramda'

import { useTodos } from 'context/TodoContext'

import TodoItem from 'components/Todo/TodoItem'
import NoDataMessage from 'components/NoDataMessage'

import './styles.css'

const TodoList: React.FC = () => {
  const { todos, filter } = useTodos()

  if (isEmpty(todos)) {
    let noDataMessage = ''
    switch (filter) {
      case 'active':
        noDataMessage = 'There are no active tasks'
        break
      case 'completed':
        noDataMessage = 'There are no completed tasks'
        break
      default:
        noDataMessage = 'Tasks have not yet been added'
    }

    return <NoDataMessage message={noDataMessage} />
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  )
}

export default TodoList
