import { forwardRef } from 'react'
import { withStyles } from '@bruitt/classnames'

import s from './Tabs.module.scss'

const sx = withStyles(s)

interface TabsProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  width?: 'auto' | 'full'
  children?: React.ReactNode
}

const Tabs = ({ children, className, width = 'auto', size = 'medium' }: TabsProps) => {
  return <div className={sx(s.tabs, className, { width, size })}>{children}</div>
}

const TabItem = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(function TabItem(
  props,
  ref
) {
  const { children, ...rest } = props

  return (
    <label className={s.item}>
      <input ref={ref} type="radio" {...rest} />
      <div className={s.content}>
        <div className={s.text}>{children}</div>
      </div>
    </label>
  )
})

const TabsNamespace = Object.assign(Tabs, { Item: TabItem })

export { TabsNamespace as Tabs }
