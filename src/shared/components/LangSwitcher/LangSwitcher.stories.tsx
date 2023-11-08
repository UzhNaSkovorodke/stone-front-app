import type { Meta, StoryObj } from '@storybook/react'

import { LangSwitcher } from './index'

const args: React.ComponentProps<typeof LangSwitcher> = {
  initial: 'ru',
  onChange: (value) => console.log(`Switcher to: ${value}`),
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LangSwitcher> = {
  title: 'Components/LangSwitcher',
  component: LangSwitcher,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LangSwitcher>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
