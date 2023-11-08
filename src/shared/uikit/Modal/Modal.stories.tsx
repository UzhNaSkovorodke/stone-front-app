import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './index'
import { Box } from '../Box'
import { Button } from '../Button'
import { useModal } from '../../hooks/useModal'

const args: React.ComponentProps<typeof Modal> = {
  isOpen: false,
  onClose: () => {
    console.log('close')
  },
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Modal> = {
  title: 'UIKit/Modal',
  component: Modal,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWithHooks = () => {
  const { isOpen, open, close } = useModal(false)
  return (
    <Box rad="16">
      <Button onClick={open}>Open modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={close}>
        {'Modal content '.repeat(500)}
      </Modal>
    </Box>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => <ModalWithHooks />,
  args: {},
}
