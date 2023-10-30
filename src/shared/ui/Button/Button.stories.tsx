import type { Meta, StoryObj } from '@storybook/react'
import { keys } from 'rambda'
import { Color } from 'src/shared/styles/colors.module.scss'
import { BUTTON_VARIANTS, Button, ButtonVariant } from './index'
import { Flex } from '../Flex'
import { Text } from '../Text'
import { Icon } from '../Icon'

const args: React.ComponentProps<typeof Button> = {
  s: 'large',
  variant: 'blackFill',
  onClick: () => console.log('click'),
  children: 'Button',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'UIKit/Button',
  component: Button,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Button>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const WithIcon: Story = {
  args: {
    pre: <Icon name="arrowLeft" />,
  },
}

export const Adaptive: Story = {
  args: {
    post: <Icon name="arrowRight" />,
    s: 'small',
    s_m: 'medium',
    s_l: 'large',
  },
}

const BG: { [key in ButtonVariant]: keyof Color } = {
  blackStroke: 'neutrals-white',
  blackStroke2: 'neutrals-white',
  blackFill: 'neutrals-white',
  whiteStroke: 'neutrals-gray-1',
  whiteStroke2: 'neutrals-gray-1',
  whiteFill: 'neutrals-gray-1',
  domStroke: 'neutrals-white',
  domStroke2: 'neutrals-gray-1',
  domFill: 'neutrals-white',
  officeStroke: 'neutrals-white',
  officeStroke2: 'neutrals-gray-1',
  officeFill: 'neutrals-white',
  redFill: 'secondary-red',
}

const COLOR: { [key in ButtonVariant]: keyof Color } = {
  blackStroke: 'neutrals-gray-1',
  blackStroke2: 'neutrals-gray-1',
  blackFill: 'neutrals-gray-1',
  whiteStroke: 'neutrals-white',
  whiteStroke2: 'neutrals-white',
  whiteFill: 'neutrals-white',
  domStroke: 'neutrals-gray-1',
  domStroke2: 'neutrals-white',
  domFill: 'neutrals-gray-1',
  officeStroke: 'neutrals-gray-1',
  officeStroke2: 'neutrals-white',
  officeFill: 'neutrals-gray-1',
  redFill: 'secondary-red',
}

export const AllVariants: Story = {
  render: (args) => (
    <Flex dir="column" jc="center">
      {keys(BUTTON_VARIANTS).map((v) => (
        <Flex key={v} dir="column" g="2" p="2" color={COLOR[v]} bgColor={BG[v]}>
          <Text s="20" lh="24">
            {v}
          </Text>
          {/* prettier-ignore */}
          <Flex g="3" ai="center">
            <Button variant={v} s="large" disabled={args.disabled}>Button</Button>
            <Button variant={v} s="medium" disabled={args.disabled}>Button</Button>
            <Button variant={v} s="small" disabled={args.disabled}>Button</Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
}
