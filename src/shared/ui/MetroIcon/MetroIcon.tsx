import { withStyles } from '@bruitt/classnames'

import styles from './MetroIcon.module.scss'
import { Flex } from 'shared/ui/Flex'

const sx = withStyles(styles)

export interface MetroIconProps {
  color: string | string[]
  children?: React.ReactNode
  s?: 'medium' | 'large'
  variant?: 'white' | 'black' | 'office'
}

export const MetroIcon = ({ color, s = 'medium', variant = 'white' }: MetroIconProps) => {
  if (!Array.isArray(color)) {
    return <div className={sx(styles.circle, { s })} style={{ backgroundColor: color }} />
  }

  return (
    <Flex className={styles.container} jc="flex-end">
      {color
        .slice()
        .reverse()
        .map((c, i) => (
          <div
            key={i}
            className={sx(styles.circle, { s, variant })}
            style={{ backgroundColor: c }}
          />
        ))}
    </Flex>
  )
}
