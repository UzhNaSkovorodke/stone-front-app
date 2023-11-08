import type { Meta, StoryObj } from '@storybook/react'

import { PlanView } from './index'

const args: React.ComponentProps<typeof PlanView> = {
  geo: {
    lat: 51.5,
    long: -0.1,
  },
  azimuthAngle: 0,
  lotNumber: 'D-LOLOLOT',
  masterPlanImage: '',
  floorPlanImage: '',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PlanView> = {
  title: 'Features/CatalogOffice/PlanView',
  component: PlanView,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof PlanView>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
