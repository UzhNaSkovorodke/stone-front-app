import type { Meta, StoryObj } from '@storybook/react'

import { FullscreenModal } from './index'
import { Box } from '../Box'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Text } from '../Text'
import { ButtonBase } from '../ButtonBase'
import { Icon } from '../Icon'
import { useModal } from '../../hooks/useModal'

const args: React.ComponentProps<typeof FullscreenModal> = {
  isOpen: false,
  onClose: () => {
    console.log('onClose')
  },
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FullscreenModal> = {
  title: 'UIKit/FullscreenModal',
  component: FullscreenModal,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof FullscreenModal>

const MobileModalWithHooks = () => {
  const { isOpen, open, close } = useModal(false)

  const header = (
    <Flex bgColor="neutrals-gray-1" jc="space-between" ai="center" px="4">
      <Text color="neutrals-white">Header</Text>
      <ButtonBase onClick={close}>
        <Icon name="close" s="24" color="neutrals-white" />
      </ButtonBase>
    </Flex>
  )

  const footer = (
    <Box bgColor="neutrals-gray-1" px="4">
      <Text color="neutrals-white">Footer</Text>
    </Box>
  )

  return (
    <Box rad="16">
      <Button onClick={open}>Open modal</Button>
      <Box>{'Modal content '.repeat(2500)}</Box>
      <FullscreenModal {...args} isOpen={isOpen} onClose={close} header={header} footer={footer}>
        {'Modal content '.repeat(500)}
      </FullscreenModal>
    </Box>
  )
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => <MobileModalWithHooks />,
  args: {},
}
