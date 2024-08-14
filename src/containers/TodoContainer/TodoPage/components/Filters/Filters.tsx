import React from 'react'
import { Button, Space } from 'antd'

import { Filter, FilterStatus } from 'features/todo/model/types/Filter'

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
      <Button
        onClick={handleSetFilter(FilterStatus.All)}
        type={getButtonType(FilterStatus.All)}
      >
        All
      </Button>
      <Button
        type={getButtonType(FilterStatus.Active)}
        onClick={handleSetFilter(FilterStatus.Active)}
      >
        Active
      </Button>
      <Button
        onClick={handleSetFilter(FilterStatus.Completed)}
        type={getButtonType(FilterStatus.Completed)}
      >
        Completed
      </Button>
    </Space.Compact>
  )
}

export default Filters
