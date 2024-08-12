import React from 'react'
import { Checkbox } from 'antd'

import { Todo } from 'Forms/TodoForm'

import { useTodos } from 'context/TodoContext'

const TodoItem: React.FC<Todo> = ({ id, text, completed }) => {
  const { toggleTodo } = useTodos()

  return (
    <li>
      <Checkbox
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      >
        <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
          {text}
        </span>
      </Checkbox>
    </li>
  )
}

export default TodoItem
