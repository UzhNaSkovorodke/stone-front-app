import type { Meta, StoryObj } from '@storybook/react'

import { LotOfficeLayoutModal } from './index'

const args: React.ComponentProps<typeof LotOfficeLayoutModal> = {
  onClose: () => console.log('close'),
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LotOfficeLayoutModal> = {
  title: 'Features/CatalogOffice/LotOfficeLayoutModal',
  component: LotOfficeLayoutModal,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LotOfficeLayoutModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
