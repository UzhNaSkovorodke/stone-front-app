import type { Meta, StoryObj } from '@storybook/react'

import { NoResults } from './index'

const args: React.ComponentProps<typeof NoResults> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NoResults> = {
  title: 'Features/CatalogOffice/NoResults',
  component: NoResults,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'light' },
  },
  args,
}

export default meta
type Story = StoryObj<typeof NoResults>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
