import type { Meta, StoryObj } from '@storybook/react'

import { PressCenterListItem } from './index'

const args: React.ComponentProps<typeof PressCenterListItem> = {
  post: {
    id: 1,
    attributes: {
      Button: {
        link: './',
        text: 'Подробнее',
        img: '',
      },
      title: 'Title',
      slug: '',
      text: '',
      type: '',
      publishedAt: '',
      createdAt: '',
      updatedAt: '',
      date: '',
      source: {
        data: {
          id: 1,
          attributes: {
            title: 'Company',
            link: '',
            img: {
              data: {
                attributes: {
                  url: '',
                },
              },
            },
          },
        },
      },

      img: {
        data: {
          attributes: {
            url: '',
            width: 0,
            height: 0,
          },
        },
      },
      categories: {
        data: [],
      },
    },
  },
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof PressCenterListItem> = {
  title: 'Features/PressCenter/PressCenterListItem',
  component: PressCenterListItem,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'light' },
  },
  args,
}

export default meta
type Story = StoryObj<typeof PressCenterListItem>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
