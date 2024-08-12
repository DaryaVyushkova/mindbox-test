import React from 'react'
import { isEmpty } from 'ramda'
import { Progress } from 'antd'

import { useTodos } from 'context/TodoContext'

import TodoItem from 'components/Todo/TodoItem'
import NoDataMessage from 'components/NoDataMessage'

import './styles.css'

const TodoList: React.FC = () => {
  const { todos, filter, itemsLeft, allTodos } = useTodos()
  const totalTasks = allTodos?.length
  const percentCompleted =
    totalTasks > 0 ? ((totalTasks - itemsLeft) / totalTasks) * 100 : 0
  const getCompletedTasksMessage = (percent: number | undefined) => {
    return `${Math.round(percent as number)} % completed (${itemsLeft} task${itemsLeft !== 1 ? 's' : ''} left)`
  }

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
    <div>
      <ul className="list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <Progress
          type="line"
          percent={percentCompleted}
          format={(percent) => getCompletedTasksMessage(percent)}
        />
      </div>
    </div>
  )
}

export default TodoList
