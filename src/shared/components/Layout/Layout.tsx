import { Box } from '../../uikit/Box'
import { ButtonBase } from '../../uikit/ButtonBase'
import { Flex } from '../../uikit/Flex'
import { Icon } from '../../uikit/Icon'
import { Footer } from '../Footer'
import { LangSwitcher } from '../LangSwitcher'
import { TopBar, TopBarProps } from '../TopBar'

import s from './Layout.module.scss'

interface LayoutProps {
  active?: TopBarProps['active']
  children?: React.ReactNode
}

export const Layout = ({ active, children }: LayoutProps) => {
  //TODO refact компонент не юзается
  return (
    <Flex className={s.root} dir="column">
      <div className={s.header}>
        <TopBar
          active={active}
          controls={
            <Flex g="3" ai="center">
              <Box display="none" display_l="block">
                <LangSwitcher initial="ru" />
              </Box>
              <ButtonBase className={s.control}>
                <Icon name="bookmark" s="24" color="neutrals-white" />
              </ButtonBase>
              <ButtonBase className={s.control}>
                <Icon name="user" s="24" color="neutrals-white" />
              </ButtonBase>
              <ButtonBase className={s.control}>
                <Icon name="burger" s="24" color="neutrals-white" />
              </ButtonBase>
            </Flex>
          }
        />
      </div>
      <Flex className={s.main} dir="column">
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}
