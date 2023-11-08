// component.tsx
exports.component = (name) => `import { withStyles } from '@bruitt/classnames'

import s from './${name}.module.scss'

const sx = withStyles(s)

interface ${name}Props {
  children?: React.ReactNode
}

export const ${name} = ({}: ${name}Props) => {
  return (
    <div className={sx()}>
      ${name}
    </div>
  )
}
`

// component.module.scss
exports.styles = () => `@use 'src/shared/styles/unity' as *;`
exports.styles = () => `@use 'src/styles/variables' as *;`
exports.styles = () => `@use 'src/shared/mixins' as *;`

// component.stories.tsx
exports.story = (name, feature = '') => {
  let featureParsed = (feature[0] || '').toUpperCase() + feature.slice(1)
  let storyTitle = feature
    ? feature === 'uikit'
      ? 'UIKit'
      : `Features/${featureParsed}`
    : 'Components'

  return `import type { Meta, StoryObj } from '@storybook/react'

import { ${name} } from './index'

const args: React.ComponentProps<typeof ${name}> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ${name}> = {
  title: '${storyTitle}/${name}',
  component: ${name},
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof ${name}>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
`
}

// index.ts
exports.indexFile = (name) => `export * from './${name}'
`
