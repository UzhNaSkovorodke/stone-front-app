import type { Meta, StoryObj } from '@storybook/react'

import { Compass } from './index'

const args: React.ComponentProps<typeof Compass> = {
  rotation: 0,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Compass> = {
  title: 'Components/Compass',
  component: Compass,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Compass>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
