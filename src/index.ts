import { Plugin } from "vite"
import path from "path"
import chalk from "chalk"
import ora from "ora"

import { PluginOptions } from "./types"
import { deleteFolderRecursive, log } from "./utils"

export default function VitePluginCleaned(options: PluginOptions = {}): Plugin {
  const { folder = "dist", hooks = {} } = options
  if (typeof folder !== "string" && !Array.isArray(folder)) {
    throw new Error(
      chalk.blue.bgRed.bold(
        "Invalid value for folder: must be a string or an array of strings."
      )
    )
  }
  const folders = typeof folder === "string" ? [folder] : folder
  let spinner = ora()

  return {
    name: "vite-plugin-cleaned",
    enforce: "pre",
    async buildStart() {
      log(
        chalk.blue("\n[vite:cleaned]"),
        chalk.green(`Start cleaning: [${folders}]`)
      )

      try {
        for (const folder of folders) {
          const folderPath = path.resolve(process.cwd(), folder)
          await deleteFolderRecursive(folderPath)
          spinner.succeed(`Deleted: ${folderPath}`)
          spinner.start()
        }
        spinner.succeed(`Cleaned ${folders.length} folders!`)
        spinner.stop()

        log(
          chalk.blue("[vite:cleaned]"),
          chalk.green("Completed successfully!\n")
        )
      } catch (error: any) {
        spinner.fail("Cleaning failed!") // 失败时更新 spinner 状态
        log(chalk.red(`Error: ${error.message}`)) // 记录错误信息
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

