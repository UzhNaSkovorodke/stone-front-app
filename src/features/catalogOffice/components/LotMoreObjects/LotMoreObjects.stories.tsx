import type { Meta, StoryObj } from '@storybook/react'

import { LotMoreObjects } from './index'

const args: React.ComponentProps<typeof LotMoreObjects> = {
  parking: [],
  recommended: [],
  isParkingLot: false,
  /* eslint-disable */
  openReservation: () => {},
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LotMoreObjects> = {
  title: 'Features/CatalogOffice/LotMoreObjects',
  component: LotMoreObjects,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LotMoreObjects>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
