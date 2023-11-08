import { withStyles } from '@bruitt/classnames'
import { ReactNode } from 'react'

import s from './Status.module.scss'

const sx = withStyles(s)

type DivProps = JSX.IntrinsicElements['div']

export const STATUS_VARIANTS = {
  purple: 'Purple',
  blue: 'Blue',
  green: 'Green',
  deepGreen: 'Deep Green',
  yellow: 'Yellow',
  red: 'Red',
  gray: 'Gray',
}

type StatusVariant = keyof typeof STATUS_VARIANTS

interface StatusProps extends DivProps {
  variant?: StatusVariant
  text: string
  pre?: ReactNode
  post?: ReactNode
  className?: string
}

export const Status = ({
  variant = 'purple',
  pre,
  post,
  text,
  className,
  ...rest
}: StatusProps) => {
  return (
    <div
      className={sx(s.status, className, {
        variant, //
        isPre: Boolean(pre),
        isPost: Boolean(post),
      })}
      {...rest}>
      {pre}
      {text}
      {post}
    </div>
  )
}
