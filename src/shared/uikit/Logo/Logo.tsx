import { withStyles } from '@bruitt/classnames'

import LogoImg from './logo.svg'

import s from './Logo.module.scss'

const sx = withStyles(s)

interface LogoProps {
  variant?: 'blue' | 'white'
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ variant = 'blue', className }) => {
  return (
    <a href="#">
      <LogoImg className={sx(s.image, className, { variant })} />
    </a>
  )
}
