import type { Meta, StoryObj } from '@storybook/react'

import { Sun } from './index'

const args: React.ComponentProps<typeof Sun> = {
  size: 's',
  lat: 55.7558,
  lon: 37.6173,
  azimuth: 0
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Sun> = {
  title: 'Components/Sun',
  component: Sun,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Sun>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
