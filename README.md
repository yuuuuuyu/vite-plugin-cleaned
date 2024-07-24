# Introduce
用于构建前清理上次构建的产物

## Install
```bash
pnpm install vite-plugin-clean -D
```

## Usage
```js
import { defineConfig } from 'vite'
import vitePluginClean from 'vite-plugin-clean'

export default defineConfig({
  plugins: [
    vitePluginClean()
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
    vitePluginClean({
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