import type { Meta, StoryObj } from '@storybook/react'

import { MobileSelect, MobileSelectOption } from './index'
import { Button } from '../Button'

const DATA: MobileSelectOption[] = [
  { label: 'Item 1', value: 1 },
  { label: 'Item 2', value: 2 },
  { label: 'Item 3', value: 3 },
  { label: 'Item 4', value: 4 },
  { label: 'Item 5', value: 5, disabled: true },
  { label: 'Item 6', value: 6 },
  { label: 'Item 7', value: 7 },
  { label: 'Item 8', value: 8 },
  { label: 'Item 9', value: 9 },
  { label: 'Item 10', value: 10 },
]

const args: React.ComponentProps<typeof MobileSelect> = {
  options: DATA,
  onChange: (o) => {
    console.log('onChange: ', o)
  },
  control: (onOpenOptions) => (
    <Button onClick={onOpenOptions} variant="blackStroke">
      Open select
    </Button>
  ),
  value: { label: 'Item 1', value: 1 },
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MobileSelect> = {
  title: 'UIKit/MobileSelect',
  component: MobileSelect,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof MobileSelect>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
