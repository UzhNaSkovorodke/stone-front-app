import type { Meta, StoryObj } from '@storybook/react'

import { PlanViewModal } from './index'

const args: React.ComponentProps<typeof PlanViewModal> = {
  isOpen: true,
  onClose: () => console.log('onClose'),
  imageSrc: '',
  geo: {
    lat: 51.5,
    long: -0.1,
  },
  azimuthAngle: 0,
  isMasterPlanSelected: false,
  isMasterPlan: true,
  onSelectFloorPlan: () => {
    console.log('onSelectFloorPlan')
  },
  onSelectMasterPlan: () => {
    console.log('onSelectMasterPlan')
  },
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PlanViewModal> = {
  title: 'Features/CatalogOffice/PlanViewModal',
  component: PlanViewModal,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof PlanViewModal>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
