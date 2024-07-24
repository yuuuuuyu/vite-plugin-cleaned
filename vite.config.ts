import { defineConfig } from "vite"
import polyfillNode from "rollup-plugin-polyfill-node"
import path from "path"
import dts from "vite-plugin-dts"
import vitePluginClean from "./src/index"

export default defineConfig({
  plugins: [
    vitePluginClean({
      folder: "dist",
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
      external: ["fs/promises", "ora"],
      output: {
        globals: {
          "fs/promises": "fs/promises",
          ora: "ora",
        },
        exports: "named",
      },
    },
  },
})

