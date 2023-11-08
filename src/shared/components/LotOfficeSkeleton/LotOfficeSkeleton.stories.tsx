import type { Meta, StoryObj } from '@storybook/react'

import { LotOfficeSkeleton } from './index'

const args: React.ComponentProps<typeof LotOfficeSkeleton> = {
  variant: 'full',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LotOfficeSkeleton> = {
  title: 'Components/LotOfficeSkeleton',
  component: LotOfficeSkeleton,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LotOfficeSkeleton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
