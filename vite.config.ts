import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"
import VitePluginCleaned from "./src/index"

import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [
    VitePluginCleaned({
      folder: ["dist"],
    }),
    dts({
      entryRoot: "src",
      outputDir: "dist",
      tsConfigFilePath: "./tsconfig.json",
    }),
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "VitePluginCleaned",
      fileName: format => `vite-plugin-cleaned.${format}.js`,
    },
    rollupOptions: {
      external: ["fs-extra", "ora", "chalk"],
      output: {
        globals: {
          "fs-extra": "fs-extra",
          ora: "ora",
          chalk: "chalk",
        },
        exports: "named",
      },
    },
  },
})

