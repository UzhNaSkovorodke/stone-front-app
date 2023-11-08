import * as React from 'react'
import { withStyles } from '@bruitt/classnames'
import { forwardRef } from 'react'

import s from './ButtonBase.module.scss'

const sx = withStyles(s)

type ElementProps = Omit<JSX.IntrinsicElements['button'], 'ref'>

export interface ButtonBaseProps extends ElementProps {}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, children, type = 'button', ...rest }, ref) => {
    return (
      <button className={sx('button', className)} ref={ref} type={type} {...rest}>
        {children}
      </button>
    )
  }
)

ButtonBase.displayName = 'ButtonBase'
