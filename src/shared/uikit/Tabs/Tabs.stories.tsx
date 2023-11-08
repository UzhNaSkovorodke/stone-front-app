import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './index'

const args: React.ComponentProps<typeof Tabs> = {
  width: 'auto',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tabs> = {
  title: 'UIKit/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Tabs>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => {
    const MOCKS = [
      { label: 'Tab', key: '1' },
      { label: 'Tab', key: '2' },
      { label: 'Tab', key: '3' },
    ]

    return (
      <Tabs {...args}>
        {MOCKS.map(({ label, key }) => (
          <Tabs.Item key={key} name="name">
            {label}
          </Tabs.Item>
        ))}
      </Tabs>
    )
  },
}
