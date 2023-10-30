import type { Meta, StoryObj } from '@storybook/react'
import { keys } from 'rambda'

import { ICON_TYPE_MAP, Icon } from './index'

const args: React.ComponentProps<typeof Icon> = {
  name: 'location',
  s: '24',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Icon> = {
  title: 'UIKit/Icon',
  component: Icon,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Icon>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {keys(ICON_TYPE_MAP).map((icon) => (
        <div
          key={icon}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
            width: 200,
          }}>
          <Icon name={icon} s="24" /> - {icon}
        </div>
      ))}
    </div>
  ),
}
