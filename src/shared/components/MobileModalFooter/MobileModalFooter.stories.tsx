import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../uikit/Button'

import { MobileModalFooter } from './index'

const args: React.ComponentProps<typeof MobileModalFooter> = {
  variant: 'dark',
  g: '1',
  children: (
    <>
      <Button variant="whiteFill" s="small" width="full">
        Забронировать
      </Button>
      <Button variant="whiteStroke" s="small" width="full">
        Подробнее
      </Button>
    </>
  ),
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MobileModalFooter> = {
  title: 'Components/MobileModalFooter',
  component: MobileModalFooter,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof MobileModalFooter>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
