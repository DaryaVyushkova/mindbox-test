import React from 'react'
import { Button } from 'antd'
import { useTodos } from 'context/TodoContext'

const ClearTodoSection: React.FC = () => {
  const { todos, clearCompleted, clearAll } = useTodos()

  const isDeleteCompletedButtonDisabled =
    todos.filter((todo) => todo.completed).length === 0

  const isDeleteAllButtonDisabled = todos.length === 0

  return (
    <>
      <div>
        <Button
          disabled={isDeleteCompletedButtonDisabled}
          onClick={clearCompleted}
          type="link"
        >
          Delete Completed
        </Button>
        <Button
          disabled={isDeleteAllButtonDisabled}
          onClick={clearAll}
          type="link"
        >
          Delete All
        </Button>
      </div>
    </>
  )
}

export default ClearTodoSection
