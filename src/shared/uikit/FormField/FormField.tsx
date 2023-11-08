import { withStyles } from '@bruitt/classnames'
import { FC, HTMLProps, ReactNode } from 'react'

import styles from './FormField.module.scss'

const sx = withStyles(styles)

type LabelProps = JSX.IntrinsicElements['label']

interface FormFieldProps {
  label?: ReactNode
  children?: ReactNode
  htmlFor?: HTMLProps<LabelProps>['htmlFor']
  className?: string
}

export const FormField: FC<FormFieldProps> = ({ label, children, htmlFor, className }) => (
  <div className={className}>
    <label
      htmlFor={htmlFor}
      className={sx({
        label: Boolean(label),
        labelText: typeof label === 'string',
      })}>
      {label}
    </label>
    {children}
  </div>
)
