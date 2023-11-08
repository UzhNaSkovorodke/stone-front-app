import { withStyles } from '@bruitt/classnames'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Box } from '../../uikit/Box'
import { Flex } from '../../uikit/Flex'
import { Text } from '../../uikit/Text'
import Logo from './logo.svg'
import s from './TopBar.module.scss'

const sx = withStyles(s)

export interface TopBarProps {
  active?: 'dom' | 'office'
  controls?: ReactNode
}

export const TopBar = ({ active, controls }: TopBarProps) => {
  return (
    <Flex className={sx(s.root)} bgColor="neutrals-gray-1" color="neutrals-white" px="4" px_m="5">
      <Flex
        className={sx(s.left, { isActive: active === 'dom' })}
        ai="center"
        jc_m="space-between"
        pr_m="4"
        pr_l="5">
        <Flex g_l="3" ai="center">
          <Link href="#" className={s.logo}>
            <Logo />
          </Link>
          <Box className={s.phoneWrapper} display="none" display_l="block" pl="3">
            <Link href="#" className={s.link}>
              <Text as="span" s="14" lh="20" w="400">
                +7 495 124-31-76
              </Text>
            </Link>
          </Box>
        </Flex>
        <Box display="none" display_m="block">
          <Link href="#" className={s.link}>
            <Text as="span" s="14" lh="20" s_l="16" lh_l="24" w="500">
              Жилая недвижимость
            </Text>
          </Link>
        </Box>
      </Flex>
      <Flex
        className={sx(s.right, { isActive: active === 'office' })}
        ai="center"
        jc="flex-end"
        jc_m="space-between"
        pl_m="4"
        pl_l="5">
        <Box display="none" display_m="block">
          <Link href="#" className={s.link}>
            <Text as="span" s="14" lh="20" s_l="16" lh_l="24" w="500">
              Коммерческие проекты
            </Text>
          </Link>
        </Box>
        {controls}
      </Flex>
    </Flex>
  )
}
