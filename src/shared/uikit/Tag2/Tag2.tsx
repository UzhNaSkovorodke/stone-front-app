import { withStyles } from '@bruitt/classnames'

import s from './Tag2.module.scss'

const sx = withStyles(s)

type BaseDivProps = JSX.IntrinsicElements['div']

export interface Tag2Props extends BaseDivProps {
  children?: React.ReactNode
  type?: 'text' | 'metro'
  variant?: 'white' | 'black'
}

export const Tag2 = ({
  children,
  variant = 'white',
  type = 'text',
  className,
  ...rest
}: Tag2Props) => {
  return (
    <div className={sx(s.root, className, { variant, type })} {...rest}>
      {typeof children === 'string' ? <span className={s.text}>{children}</span> : children}
    </div>
  )
}
