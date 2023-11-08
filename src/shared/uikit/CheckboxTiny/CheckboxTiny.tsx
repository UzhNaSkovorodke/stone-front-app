import { withStyles } from '@bruitt/classnames'
import { forwardRef, ReactNode } from 'react'

import s from './CheckboxTiny.module.scss'

const sx = withStyles(s)

type InputProps = JSX.IntrinsicElements['input']

interface CheckboxTinyProps extends InputProps {
  type?: 'checkbox' | 'radio'
  text: ReactNode
}

export const CheckboxTiny = forwardRef<HTMLInputElement, CheckboxTinyProps>(function CheckboxTiny(
  props,
  ref
) {
  const { type = 'radio', text, className, ...inputProps } = props

  return (
    <label className={sx(s.root)}>
      <input className={s.input} type={type} {...inputProps} ref={ref} />
      <div className={s.wrapper}>
        <div className={s.icon} />
        <div className={sx(s.text, className)}>{text}</div>
      </div>
    </label>
  )
})
