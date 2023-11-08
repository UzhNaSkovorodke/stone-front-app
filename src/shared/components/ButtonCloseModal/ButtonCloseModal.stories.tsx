import type { Meta, StoryObj } from '@storybook/react'

import { ButtonCloseModal } from './index'

const args: React.ComponentProps<typeof ButtonCloseModal> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ButtonCloseModal> = {
  title: 'Components/ButtonCloseModal',
  component: ButtonCloseModal,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof ButtonCloseModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
