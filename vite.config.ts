import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"
import vitePluginClean from "./src/index"

import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  //   optimizeDeps: {
  //     include: ["fs-extra", "ora", "path"],
  //   },
  plugins: [
    vitePluginClean({
      folder: "dist",
    }),
    dts({
      entryRoot: "src",
      outputDir: "dist/types",
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

