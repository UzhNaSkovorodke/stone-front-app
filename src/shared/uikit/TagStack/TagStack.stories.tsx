import type { Meta, StoryObj } from '@storybook/react'

import { TagStack } from './index'
import { Tag2 } from '../Tag2'
import { Text } from '../Text'

const args: React.ComponentProps<typeof TagStack> = {
  children: [<Tag2 key={1}>Tab</Tag2>, <Tag2 key={2}>Tab</Tag2>, <Tag2 key={3}>Tab</Tag2>],
  variant: 'button',
  size: 'medium',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TagStack> = {
  title: 'UIKit/TagStack',
  component: TagStack,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof TagStack>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const Button: Story = {
  args: {
    children: [<Tag2 key={1}>Tab</Tag2>, <Tag2 key={2}>Tab</Tag2>, <Tag2 key={3}>Tab</Tag2>],
    variant: 'button',
    size: 'medium',
  },
}

export const WithMetro: Story = {
  args: {
    children: [
      <Tag2 key={1}>Tab</Tag2>,
      <Tag2 key={2}>Tab</Tag2>,
      <Tag2 key={3} type="metro"></Tag2>,
    ],
  },
}

export const WithTextSmall: Story = {
  args: {
    variant: 'text',
    size: 'small',
    children: [
      <Text key={1} s="12" lh="16" w="400">
        Tag
      </Text>,
      <Text key={2} s="12" lh="16" w="400">
        Tag
      </Text>,
      <Text key={3} s="12" lh="16" w="400">
        Tag
      </Text>,
    ],
  },
}

export const WithTextMedium: Story = {
  args: {
    variant: 'text',
    size: 'medium',
    children: [
      <Text key={1} s="14" lh="20" w="500">
        Tag
      </Text>,
      <Text key={2} s="14" lh="20" w="500">
        Tag
      </Text>,
      <Text key={3} s="14" lh="20" w="500">
        Tag
      </Text>,
    ],
  },
}
