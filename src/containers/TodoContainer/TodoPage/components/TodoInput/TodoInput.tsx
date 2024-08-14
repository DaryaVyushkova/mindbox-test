import React, { useState } from 'react'
import { Button, Input, Space } from 'antd'

import { useTodos } from 'context/TodoContext'
import { defaultAttributes } from 'features/todo/model/Todo'
import { submitTodoAttributes } from 'features/todo/model/utils/todoSubmission'
import { ITodo } from 'features/todo/model/Todo'

import './styles.css'

const TodoInput: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>(defaultAttributes.newTodo)
  const [error, setError] = useState<string>(defaultAttributes.error)
  const { addTodo, todos: allTodos } = useTodos()

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setNewTodo(e.target.value)
  }

  const handleAddTodo = () => {
    const todoToAdd: ITodo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    window.gtag('event', 'add_todo', {
      event_category: 'Todo',
      event_label: JSON.stringify(todoToAdd),
      value: 1,
    })

    submitTodoAttributes(newTodo, allTodos, addTodo, setError, () =>
      setNewTodo('')
    )
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
