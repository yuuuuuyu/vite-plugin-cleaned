import { defineConfig } from "vite"
import polyfillNode from "rollup-plugin-polyfill-node"
import path from "path"
import dts from "vite-plugin-dts"
import vitePluginClean from "./src/index"

import chalk from "chalk" // 确保在这里导入到了 chalk
console.log("Chalk version:", chalk) // 调试输出
export default defineConfig({
  plugins: [
    vitePluginClean({
      folder: "222",
    }),
    dts({
      entryRoot: "src",
      outputDir: "dist/types",
      tsConfigFilePath: "./tsconfig.json",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VitePluginClean",
      fileName: format => `vite-plugin-clean.${format}.js`,
    },
    rollupOptions: {
      plugins: [polyfillNode()],
      external: ["fs/promises"],
      output: {
        globals: {
          "fs/promises": "fs/promises",
        },
        exports: "named",
      },
    },
  },
})

