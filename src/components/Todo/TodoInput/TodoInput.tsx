import React, { useState } from 'react'
import { Button, Input, Space } from 'antd'

import { useTodos } from 'context/TodoContext'

import { defaultAttributes } from 'Types/Todo'
import { submitTodoAttributes } from 'utils/todoSubmission'

import './styles.css'

const TodoInput: React.FC = () => {
  const [newTodo, setNewTodo] = useState(defaultAttributes.newTodo)
  const [error, setError] = useState(defaultAttributes.error)
  const { addTodo, todos: allTodos } = useTodos()

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNewTodo(e.target.value)
  }

  const handleAddTodo = () => {
    window.gtag('event', 'add_todo', {
      event_category: 'Todo',
      event_label: newTodo,
      value: 1,
    })

    submitTodoAttributes(newTodo, allTodos, addTodo, setError, setNewTodo)
  }

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          allowClear
          onPressEnter={handleAddTodo}
          status={error ? 'error' : ''}
          type="text"
          value={newTodo}
          onChange={handleFieldChange}
          placeholder="What needs to be done?"
        />
        <Button disabled={!newTodo.trim()} onClick={handleAddTodo}>
          Add
        </Button>
      </Space.Compact>
      {error && <p className={'errorMessage'}>{error}</p>}
    </>
  )
}

export default TodoInput
