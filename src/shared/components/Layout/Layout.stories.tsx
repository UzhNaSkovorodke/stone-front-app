import type { Meta, StoryObj } from '@storybook/react'

import { Layout } from './index'

const args: React.ComponentProps<typeof Layout> = {
  children: 'Content',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  args,
}

export default meta
type Story = StoryObj<typeof Layout>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
