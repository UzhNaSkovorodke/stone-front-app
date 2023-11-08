import s from './InputGroupped.module.scss'
import { InputProps } from '../Input'
import { withStyles } from '@bruitt/classnames'

const sx = withStyles(s)

interface InputGrouppedProps {
  children?: React.ReactElement<InputProps> | React.ReactElement<InputProps>[]
  className?: string
}

export const InputGroupped = ({ children, className }: InputGrouppedProps) => {
  return <div className={sx(s.root, className)}>{children}</div>
}
