import type { Meta, StoryObj } from '@storybook/react'

import { BaseModal } from './index'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Box } from '../Box'
import { useModal } from '../../hooks/useModal'

const args: React.ComponentProps<typeof BaseModal> = {
  isOpen: false,
  onClose: () => {
    console.log('onClose')
  },
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BaseModal> = {
  title: 'UIKit/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof BaseModal>

const BaseModalWithHooks = () => {
  const { isOpen, open, close } = useModal(false)
  return (
    <Box rad="16">
      <Button onClick={open}>Open modal</Button>
      <BaseModal {...args} isOpen={isOpen}>
        <Flex jc="flex-end">
          <Button onClick={close} s="small">
            X
          </Button>
        </Flex>
        {'Modal content '.repeat(500)}
      </BaseModal>
    </Box>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => <BaseModalWithHooks />,
  args: {},
}
