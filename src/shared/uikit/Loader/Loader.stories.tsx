import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './index'

const args: React.ComponentProps<typeof Loader> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Loader> = {
  title: 'UIKit/Loader',
  component: Loader,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Loader>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => {
    return (
      <div
        style={{
          position: 'relative',
          padding: 16,
          margin: 16,
          display: 'inline-flex',
          border: '1px solid gray',
          borderRadius: 10,
        }}>
        Hello world
        <Loader.Overlay isActive>
          <Loader {...args} />
        </Loader.Overlay>
      </div>
    )
  },
}
