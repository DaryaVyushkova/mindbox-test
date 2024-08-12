import React from 'react'
import { Checkbox, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

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
      <Button type="link" onClick={() => deleteTodo(id)}>
        <DeleteOutlined />
      </Button>
    </li>
  )
}

export default TodoItem
