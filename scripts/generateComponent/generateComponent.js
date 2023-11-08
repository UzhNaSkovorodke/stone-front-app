const fs = require('fs')
const { component, styles, story, indexFile } = require('./componentTemplates.js')

const [name, feature] = process.argv.slice(2)
let isUIKit = feature === 'uikit'

if (!name) {
  console.log('Error! Provide a component name as first argument.')
  process.exit(1)
}

const dir = `./src/${
  feature ? (isUIKit ? 'shared/uikit' : `features/${feature}/components`) : 'shared/components'
}/${name}`

if (fs.existsSync(dir)) {
  console.log('Error! Component with same name already exists.')
  process.exit(1)
}

if (feature && !isUIKit && !fs.existsSync(`src/features/${feature}`)) {
  console.log("Error! Feature folder doesn't exist.")
  process.exit(1)
}

fs.mkdirSync(dir)

function onError(err) {
  if (err) throw err
}

fs.writeFile(`${dir}/${name}.tsx`, component(name), onError)
fs.writeFile(`${dir}/${name}.module.scss`, styles(), onError)
fs.writeFile(`${dir}/${name}.stories.tsx`, story(name, feature), onError)
fs.writeFile(`${dir}/index.ts`, indexFile(name), onError)
