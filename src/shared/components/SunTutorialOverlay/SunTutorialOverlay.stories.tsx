import type { Meta, StoryObj } from '@storybook/react'

import { SunTutorialOverlay } from './index'

const args: React.ComponentProps<typeof SunTutorialOverlay> = {
  isOpen: true,
  onClose: () => console.log('onClose'),
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SunTutorialOverlay> = {
  title: 'Components/SunTutorialOverlay',
  component: SunTutorialOverlay,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof SunTutorialOverlay>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
