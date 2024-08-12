import React from 'react'
import { Checkbox, Button } from 'antd'

import { Todo } from 'Forms/TodoForm'

import { useTodos } from 'context/TodoContext'

import './styles.css'

const TodoItem: React.FC<Todo> = ({ id, text, completed }) => {
  const { toggleTodo, deleteTodo } = useTodos()

  return (
    <li className={'item'}>
      <Checkbox
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      >
        <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
          {text}
        </span>
      </Checkbox>
      <Button type="link" danger onClick={() => deleteTodo(id)}>
        Delete
      </Button>
    </li>
  )
}

export default TodoItem
