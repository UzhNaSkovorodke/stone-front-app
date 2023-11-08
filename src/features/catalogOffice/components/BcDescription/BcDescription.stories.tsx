import type { Meta, StoryObj } from '@storybook/react'

import { BcDescription } from './index'

const args: React.ComponentProps<typeof BcDescription> = {
  address: 'Бумажный проезд, вл. 19, стр. 1',
  title: 'STONE Towers',
  year: 2039,
  metro: [
    {
      color: '#2C7B55',
      name: 'Белорусская',
      timeTo: 5,
      station: '',
    },
  ],
  timeTo: {
    val: '50 мин до релиза',
    slug: '',
    category: '',
    icoImg: {
      attributes: {
        url: '',
      },
    },
  },
  housing: 'D2',
  slug: 'leninskii',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BcDescription> = {
  title: 'Features/CatalogOffice/BcDescription',
  component: BcDescription,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof BcDescription>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
