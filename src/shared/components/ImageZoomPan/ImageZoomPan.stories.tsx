import type { Meta, StoryObj } from '@storybook/react'

import { ImageZoomPan } from './index'
import { Flex } from '../../uikit/Flex'
import { IconButton } from '../../uikit/IconButton'

const args: React.ComponentProps<typeof ImageZoomPan> = {
  src: '',
  renderControls: () => (
    <Flex display="none" display_m="flex" dir="column" g="1" jc="center" pl="2">
      <IconButton icon="plus" />
      <IconButton icon="minus" />
    </Flex>
  ),
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ImageZoomPan> = {
  title: 'Components/ImageZoomPan',
  component: ImageZoomPan,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof ImageZoomPan>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
