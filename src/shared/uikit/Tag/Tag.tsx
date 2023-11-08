import { withStyles } from '@bruitt/classnames'

import s from './Tag.module.scss'

const sx = withStyles(s)

type BaseDivProps = JSX.IntrinsicElements['div']

export interface TagProps extends BaseDivProps {
  children?: React.ReactNode
  // вариант "large" добавлен не по макетам uikit, а из продуктового дизайна, нужно добавить в фигму uikit'а
  size?: 'small' | 'medium' | 'large'
  color?: 'white' | 'black'
  variant?: 'button' | 'text'
}

export const Tag = ({
  children,
  color = 'white',
  size = 'medium',
  variant = 'button',
  className,
  ...rest
}: TagProps) => {
  return (
    <div className={sx(s.root, className, { size, variant, color })} {...rest}>
      {children}
    </div>
  )
}
