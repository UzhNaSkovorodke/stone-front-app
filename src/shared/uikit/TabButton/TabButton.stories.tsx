import type { Meta, StoryObj } from '@storybook/react'

import { TAB_BUTTON_VARIANTS, TabButton } from './index'
import { Flex } from '../Flex'
import { Text } from '../Text'

const args: React.ComponentProps<typeof TabButton> = {
  text: 'Tab',
  size: 'medium',
  type: 'checkbox',
  width: 'auto',
  variant: '3',
  name: 'test',
  disabled: false,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TabButton> = {
  title: 'UIKit/TabButton',
  component: TabButton,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof TabButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: args.size === 'medium' ? 8 : 4,
      }}>
      <TabButton {...args} />
      <TabButton {...args} />
      <TabButton {...args} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: (args) => (
    <Flex dir="column" jc="center">
      {TAB_BUTTON_VARIANTS.map((v) => (
        <Flex key={v} dir="column" g="2" p="2" color="neutrals-gray-1">
          <Text s="20" lh="24">
            {`Variant - '${v}'`}
          </Text>
          <div
            style={{
              display: 'flex',
              gap: args.size === 'medium' ? 8 : 4,
            }}>
            <TabButton {...args} variant={v} />
            <TabButton {...args} variant={v} />
            <TabButton {...args} variant={v} />
          </div>
        </Flex>
      ))}
    </Flex>
  ),
}
