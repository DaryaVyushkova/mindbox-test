import React from 'react'
import { Button, Space } from 'antd'

import { Filter } from 'Forms/FilterForm'

import { useTodos } from 'context/TodoContext'

const Filters: React.FC = () => {
  const { filter, setFilter } = useTodos()

  const handleSetFilter = (value: Filter) => () => {
    setFilter(value)
  }

  const getButtonType = (filterValue: Filter) =>
    filter === filterValue ? 'primary' : 'default'

  return (
    <Space.Compact
      style={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Button onClick={handleSetFilter('all')} type={getButtonType('all')}>
        All
      </Button>
      <Button
        type={getButtonType('active')}
        onClick={handleSetFilter('active')}
      >
        Active
      </Button>
      <Button
        onClick={handleSetFilter('completed')}
        type={getButtonType('completed')}
      >
        Completed
      </Button>
    </Space.Compact>
  )
}

export default Filters
