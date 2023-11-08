import type { Meta, StoryObj } from '@storybook/react'

import { SWITCHER_VARIANTS, Switcher } from './index'
import { Box } from '../Box'
import { Text } from '../Text'
import { keys } from 'rambda'

const args: React.ComponentProps<typeof Switcher> = {
  variant: 'blackFill',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Switcher> = {
  title: 'UIKit/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Switcher>

const MOCK_DATA = [
  {
    label: 'Item 1',
    name: 'item1',
    disabled: false,
  },
  {
    label: 'Item 2',
    name: 'item2',
    disabled: false,
  },
  {
    label: 'Item 3',
    name: 'item3',
    disabled: false,
  },
  {
    label: 'Item 4',
    name: 'item4',
    disabled: true,
  },
]

const items = MOCK_DATA.map(({ label, name, disabled }) => (
  <Switcher.Item key={name} name={name} disabled={disabled}>
    {label}
  </Switcher.Item>
))

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => <Switcher {...args}>{items}</Switcher>,
  args: {},
}

export const TwoColumns: Story = {
  render: (args) => (
    <Switcher {...args} cols="2">
      {items}
    </Switcher>
  ),
  args: {},
}

export const FourColumns: Story = {
  render: (args) => (
    <Switcher {...args} cols="4">
      {items}
    </Switcher>
  ),
  args: {},
}

export const AllVariants: Story = {
  render: () => (
    <>
      {keys(SWITCHER_VARIANTS).map((v) => (
        <Box key={v} mb="4">
          <Text mb="1">{SWITCHER_VARIANTS[v]}</Text>
          <Box mb="3">
            <Switcher cols="2" variant={v}>
              {items}
            </Switcher>
          </Box>

          <Switcher cols="4" variant={v}>
            {items}
          </Switcher>
        </Box>
      ))}
    </>
  ),
}
