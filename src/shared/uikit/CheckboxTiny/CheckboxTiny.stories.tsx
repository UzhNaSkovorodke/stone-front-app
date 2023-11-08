import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxTiny } from './index'

const args: React.ComponentProps<typeof CheckboxTiny> = {
  text: 'Общая',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CheckboxTiny> = {
  title: 'Components/CheckboxTiny',
  component: CheckboxTiny,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof CheckboxTiny>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
