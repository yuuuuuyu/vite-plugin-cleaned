import { Plugin } from "vite"
import path from "path"
import chalk from "chalk"
import ora from "ora"

import { PluginOptions } from "./types"
import { deleteFolderRecursive, log } from "./utils"

export default function vitePluginClean(options: PluginOptions = {}): Plugin {
  const { folder = "dist", hooks = {} } = options
  if (typeof folder !== "string" && !Array.isArray(folder)) {
    throw new Error(
      chalk.blue.bgRed.bold(
        "Invalid value for folder: must be a string or an array of strings."
      )
    )
  }
  const folders = typeof folder === "string" ? [folder] : folder
  let spinner = ora("Loading...")
  return {
    name: "vite-plugin-cleaned",
    enforce: "pre",
    async buildStart() {
      log(
        chalk.blue("\n[vite:cleaned]"),
        chalk.green(`Start cleaning: ${folders.join(", ")}`)
      )
      spinner = ora("Loading...").start()

      for (const folder of folders) {
        const folderPath = path.resolve(process.cwd(), folder)
        await deleteFolderRecursive(folderPath)
        log(
          chalk.blue("\n[vite:cleaned]"),
          chalk.green.bold(`Successfully deleted: ${folderPath}`)
        )
      }
      if (hooks.buildStart) {
        await hooks.buildStart()
      }
    },
    closeBundle() {
      spinner.stop()
      if (hooks.closeBundle) {
        hooks.closeBundle()
      }
    },
  }
}

