# Introduce
用于构建前清理上次构建的产物

## Install
```bash
pnpm install vite-plugin-cleaned -D
```

## Usage
```js
import { defineConfig } from 'vite'
import vitePluginCleaned from 'vite-plugin-cleaned'

export default defineConfig({
  plugins: [
    vitePluginCleaned()
  ]
})
```

## API

### options

```js
export type PluginOptions = {
  folder: string | string[]
  hooks?: {
    buildStart?: () => void | Promise<void>
    closeBundle?: () => void | Promise<void>
  }
}
```
### example
```js
export default defineConfig({
  plugins: [
    vitePluginCleaned({
        folder: 'dist', // default: dist or ['dist'] or ['dist', 'lib']
        hooks: {
          buildStart() {
            console.log('build start')
          }
        }
    })
  ]
})
```