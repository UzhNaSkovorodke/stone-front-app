import { withStyles } from '@bruitt/classnames'
import { ReactNode } from 'react'
import { ColorProps } from '../../lib/types/colors'
import { IconSizesProps } from '../../lib/types/icons'
import { Icon } from '../Icon'

import s from './Loader.module.scss'

const sx = withStyles(s)

interface LoaderProps extends IconSizesProps, ColorProps {
  className?: string
}

const Loader = ({ className, ...props }: LoaderProps) => {
  return <Icon className={sx(s.icon, className)} name="spinner" s="24" {...props} />
}

interface LoaderOverlayProps {
  isActive?: boolean
  className?: string
  children: ReactNode
}

const Overlay = ({ children, isActive, className }: LoaderOverlayProps) => {
  if (!isActive) return null

  return <div className={sx(s.overlay, className)}>{children}</div>
}

const LoaderNamespace = Object.assign(Loader, { Overlay })

export { LoaderNamespace as Loader }
