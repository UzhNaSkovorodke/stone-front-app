import type { Meta, StoryObj } from '@storybook/react'
/*import { Box } from '../../uikit/Box'*/
import { ButtonBase } from '../../uikit/ButtonBase'
import { Flex } from '../../uikit/Flex'
import { Icon } from '../../uikit/Icon'
/*import { LangSwitcher } from '../LangSwitcher'*/

import { TopBar } from './index'

const args: React.ComponentProps<typeof TopBar> = {
  controls: (
    <Flex g="3" ai="center">
      {/*     <Box display="none" display_l="block">
        <LangSwitcher initial="ru" />
      </Box>*/}
      {/*      <ButtonBase style={{ display: 'flex' }}>
        <Icon name="bookmark" s="24" color="neutrals-white" />
      </ButtonBase>*/}
      <ButtonBase style={{ display: 'flex' }}>
        <Icon name="user" s="24" color="neutrals-white" />
      </ButtonBase>
      <ButtonBase style={{ display: 'flex' }}>
        <Icon name="burger" s="24" color="neutrals-white" />
      </ButtonBase>
    </Flex>
  ),
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  // tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof TopBar>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const Dom: Story = {
  args: {
    active: 'dom',
  },
}

export const Office: Story = {
  args: {
    active: 'office',
  },
}
