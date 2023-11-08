import { withStyles } from '@bruitt/classnames'
import { FC, ReactNode, useRef } from 'react'

import styles from './Collapse.module.scss'
const sx = withStyles(styles)

export interface CollapseProps {
  className?: string
  isOpen?: boolean
  children: ReactNode
  initialHeight?: number
}

export const Collapse: FC<CollapseProps> = ({ isOpen, className, initialHeight = 0, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={sx('root', className, {
        isOpen,
      })}
      ref={ref}
      style={{ maxHeight: isOpen ? undefined : initialHeight }}>
      {children}
    </div>
  )
}
