import { withStyles } from '@bruitt/classnames'
import { Flex, FlexProps } from '../../uikit/Flex'

import s from './MobileModalFooter.module.scss'

const sx = withStyles(s)

interface MobileModalFooterProps extends FlexProps {
  children?: React.ReactNode
  variant: 'light' | 'dark'
}

export const MobileModalFooter = ({ children, variant, ...rest }: MobileModalFooterProps) => {
  return (
    <Flex className={sx(s.root, { variant })} p="2" pb="4" {...rest}>
      {children}
    </Flex>
  )
}
