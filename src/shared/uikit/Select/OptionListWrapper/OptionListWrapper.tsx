import { withStyles } from '@bruitt/classnames'
import { HTMLProps, forwardRef } from 'react'

import styles from './OptionListWrapper.module.scss'
import { InputWrapperProps } from '../../InputWrapper'

interface OptionListWrapperProps extends HTMLProps<HTMLDivElement> {
  variant: InputWrapperProps['variant']
}

const sx = withStyles(styles)

export const OptionListWrapper = forwardRef<HTMLDivElement, OptionListWrapperProps>(
  ({ children, variant }, ref) => {
    return (
      <div
        ref={ref}
        className={sx(styles.root, { variant })}
        onMouseDown={(e) => e.preventDefault()}
        onMouseUp={(e) => e.preventDefault()}>
        {children}
      </div>
    )
  }
)

OptionListWrapper.displayName = 'OptionListWrapper'
