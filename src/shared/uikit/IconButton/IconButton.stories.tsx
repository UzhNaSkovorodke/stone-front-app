import type { Meta, StoryObj } from '@storybook/react'
import { Color } from 'shared/styles/colors.module.scss'
import { ICON_BUTTON_VARIANTS, IconButton, IconButtonVariant } from './index'
import { Flex } from '../Flex'
import { keys } from 'rambda'
import { Text } from '../Text'

const args: React.ComponentProps<typeof IconButton> = {
  variant: 'blackStroke',
  icon: 'arrowLongRight',
  s: 'l',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof IconButton> = {
  title: 'UIKit/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof IconButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

const BG: { [key in IconButtonVariant]: keyof Color } = {
  blackStroke: 'neutrals-white',
  blackFill: 'neutrals-white',
  grayStroke: 'neutrals-white',
  grayStrokeSmall: 'neutrals-white',
  whiteStroke: 'neutrals-gray-1',
  whiteFill: 'neutrals-gray-1',
}

const COLOR: { [key in IconButtonVariant]: keyof Color } = {
  blackStroke: 'neutrals-gray-1',
  blackFill: 'neutrals-gray-1',
  grayStroke: 'neutrals-gray-1',
  grayStrokeSmall: 'neutrals-gray-1',
  whiteStroke: 'neutrals-white',
  whiteFill: 'neutrals-white',
}

export const AllVariants: Story = {
  render: (args) => (
    <Flex dir="column" jc="center">
      {keys(ICON_BUTTON_VARIANTS).map((v) => (
        <Flex key={v} dir="column" g="2" p="2" color={COLOR[v]} bgColor={BG[v]}>
          <Text s="20" lh="24">
            {v}
          </Text>
          <Flex g="3" ai="center">
            <IconButton variant={v} icon="arrowLeft" disabled={args.disabled} />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
}
