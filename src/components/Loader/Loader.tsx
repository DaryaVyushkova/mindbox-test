import React from 'react'
import { Spin, SpinProps } from 'antd'

import './styles.css'

interface LoaderProps extends SpinProps {
  className?: string
}

const Loader: React.FC<LoaderProps> = ({
  className = 'centered',
  ...props
}) => {
  return (
    <div className={className}>
      <Spin {...props} />
    </div>
  )
}

export default Loader
