import type { Meta, StoryObj } from '@storybook/react'
import { keys } from 'rambda'
import { Flex } from '../Flex'
import { Icon } from '../Icon'

import { Status, STATUS_VARIANTS } from './index'

const args: React.ComponentProps<typeof Status> = {
  text: 'Status',
  variant: 'purple',
  pre: <Icon name="info" s="12" />,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Status> = {
  title: 'UIKit/Status',
  component: Status,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Status>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const AllVariants: Story = {
  render: () => (
    <Flex g="3">
      <Flex dir="column" g="3">
        {keys(STATUS_VARIANTS).map((v) => (
          <Status key={v} variant={v} text="Status" />
        ))}
      </Flex>
      <Flex dir="column" g="3">
        {keys(STATUS_VARIANTS).map((v) => (
          <Status key={v} variant={v} pre={<Icon name="info" s="12" />} text="Status" />
        ))}
      </Flex>
      <Flex dir="column" g="3">
        {keys(STATUS_VARIANTS).map((v) => (
          <Status key={v} variant={v} post={<Icon name="info" s="12" />} text="Status" />
        ))}
      </Flex>
    </Flex>
  ),
}
