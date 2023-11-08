import type { Meta, StoryObj } from '@storybook/react'

import { Grid } from './index'

const Block = ({ h = 100 }: { h?: number }) => (
  <div style={{ width: 150, height: h, backgroundColor: '#aee' }} />
)

const args: React.ComponentProps<typeof Grid> = {
  children: [
    <Block key={0} h={50} />,
    <Block key={1} h={100} />,
    <Block key={2} h={70} />,
    <Block key={3} h={100} />,
    <Block key={4} h={70} />,
    <Block key={5} h={50} />,
    <Block key={6} h={70} />,
    <Block key={7} h={50} />,
    <Block key={8} h={100} />,
  ],
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Grid> = {
  title: 'UIKit/Grid',
  component: Grid,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Grid>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
