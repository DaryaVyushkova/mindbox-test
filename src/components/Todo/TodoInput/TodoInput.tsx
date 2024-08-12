import React, { useState } from 'react'
import { Button, Input, Space } from 'antd'

import { useTodos } from 'context/TodoContext'

import { defaultAttributes, attributesToSubmit } from 'Forms/TodoForm'

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
    attributesToSubmit(newTodo, allTodos, addTodo, setError, setNewTodo)
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
