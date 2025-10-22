import fs from 'fs-extra'
import getTheme from './theme'

console.log('starting')

fs.mkdir('./themes', { recursive: true })
  .then(() => Promise.all([
    fs.writeJSON(
      './themes/oq-light.json',
      getTheme({
        color: 'light',
        name: 'oQ Light',
      }),
      { spaces: 2 },
    ),
    fs.writeJSON(
      './themes/oq-dark.json',
      getTheme({
        color: 'dark',
        name: 'oQ Dark',
      }),
      { spaces: 2 },
    ),
    fs.writeJSON(
      './themes/oq-dark-soft.json',
      getTheme({
        color: 'dark',
        name: 'oQ Dark Soft',
        soft: true,
      }),
      { spaces: 2 },
    ),
    fs.writeJSON(
      './themes/oq-light-soft.json',
      getTheme({
        color: 'light',
        name: 'oQ Light Soft',
        soft: true,
      }),
      { spaces: 2 },
    ),
  ]))

console.log('finished')
