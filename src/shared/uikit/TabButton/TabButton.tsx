import { withStyles } from '@bruitt/classnames'

import s from './TabButton.module.scss'
import { ReactNode, forwardRef } from 'react'

const sx = withStyles(s)

export const TAB_BUTTON_VARIANTS = ['1', '2', '3'] as const

type TabButtonVariant = (typeof TAB_BUTTON_VARIANTS)[number]

type InputProps = JSX.IntrinsicElements['input']

interface TabButtonProps extends Omit<InputProps, 'size'> {
  variant?: TabButtonVariant
  type?: 'checkbox' | 'radio'
  text: ReactNode
  size?: 'medium' | 'small'
  width?: 'full' | 'auto'
}

export const TabButton = forwardRef<HTMLInputElement, TabButtonProps>(function TabButton(
  props,
  ref
) {
  const {
    variant = '1',
    type = 'checkbox',
    text,
    size,
    width = 'auto',
    className,
    disabled,
    ...inputProps
  } = props

  return (
    <label className={sx(s.root, { width })}>
      <input className={s.input} ref={ref} type={type} disabled={disabled} {...inputProps} />
      <div className={sx(s.text, className, { size, width, variant, disabled })}>{text}</div>
    </label>
  )
})
