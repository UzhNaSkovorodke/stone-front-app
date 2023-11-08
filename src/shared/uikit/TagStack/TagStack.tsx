import { withStyles } from '@bruitt/classnames'

import s from './TagStack.module.scss'
import { Children, ReactElement, cloneElement, isValidElement } from 'react'

const sx = withStyles(s)

interface TagStackProps {
  children?: React.ReactNode
  variant?: 'text' | 'button'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const TagStack = ({
  children,
  variant = 'button',
  size = 'medium',
  className,
}: TagStackProps) => {
  return (
    <div className={sx(s.root, className, { variant, size })}>
      {Children.map(
        children,
        (child) =>
          isValidElement(child) &&
          cloneElement(child as ReactElement, {
            className: sx(child.props.className, s.child),
          })
      )}
    </div>
  )
}
