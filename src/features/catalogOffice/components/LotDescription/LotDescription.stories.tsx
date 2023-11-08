import type { Meta, StoryObj } from '@storybook/react'

import { LotDescription } from './index'

const args: React.ComponentProps<typeof LotDescription> = {
  area: '1234',
  lotNumber: '1',
  discountedPrice: '8000000',
  discountVolume: '10',
  sellingPrice: '10000000',
  sellingPricePerMeter: '500000',
  typeName: 1,
  features: [],
  promo: [],
  projectFeatures: [],
  /* eslint-disable */
  openReservation: () => {},
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LotDescription> = {
  title: 'Features/CatalogOffice/LotDescription',
  component: LotDescription,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LotDescription>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
