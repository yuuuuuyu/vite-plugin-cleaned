import { Plugin } from "vite"
import path from "path"
import chalk from "chalk"

import { PluginOptions } from "./types"
import { deleteFolderRecursive, log } from "./utils"

export default function vitePluginClean(options: PluginOptions): Plugin {
  const { folder = "dist", hooks = {} } = options || {}
  if (typeof folder !== "string" && !Array.isArray(folder)) {
    throw new Error(
      chalk.blue.bgRed.bold(
        "Invalid value for folder: must be a string or an array of strings."
      )
    )
  }
  const folders = typeof folder === "string" ? [folder] : folder

  return {
    name: "vite-plugin-clean",
    async buildStart() {
      log(
        chalk.blue("[vite:clean]"),
        chalk.green(`Start cleaning: ${folders.join(", ")}`)
      )
      for (const folder of folders) {
        const folderPath = path.resolve(process.cwd(), folder)
        await deleteFolderRecursive(folderPath)
        log(
          chalk.blue("[vite:clean]"),
          chalk.green.bold(`Successfully deleted: ${folderPath}`)
        )
      }
      if (hooks.buildStart) {
        await hooks.buildStart()
      }
    },
    closeBundle() {
      if (hooks.closeBundle) {
        hooks.closeBundle()
      }
    },
  }
}

