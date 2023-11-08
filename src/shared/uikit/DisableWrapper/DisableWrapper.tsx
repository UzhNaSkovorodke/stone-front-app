import { withStyles } from '@bruitt/classnames'
import React from 'react'

import s from './DisableWrapper.module.scss'

const sx = withStyles(s)

interface DisableWrapperProps {
  isDisabled: boolean
  className?: string
  children?: React.ReactNode
}

export const DisableWrapper: React.FC<DisableWrapperProps> = ({
  isDisabled,
  className,
  children,
}) => {
  return <div className={sx('root', className, { isDisabled })}>{children}</div>
}
