import { Plugin } from "vite"
import path from "path"
import fs from "fs-extra"
import chalk from "chalk"
import ora from "ora"

import { PluginOptions } from "./types"

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
      console.log(
        chalk.blue("\n[vite:cleaned]"),
        chalk.green(`Start cleaning: [${folders}]`)
      )

      try {
        for (const folder of folders) {
          const folderPath = path.resolve(process.cwd(), folder)
          try {
            await fs.removeSync(folderPath)
            spinner.succeed(`Deleted: ${folderPath}`)
          } catch (deleteError) {
            spinner.fail(`Failed to delete: ${folderPath}`)
            console.log(chalk.red(`Error: ${deleteError.message}`))
          }
          spinner.start()
        }
        spinner.succeed(`Cleaned ${folders.length} folders!`)
        spinner.stop()

        console.log(
          chalk.blue("[vite:cleaned]"),
          chalk.green("Completed successfully!\n")
        )
      } catch (error: any) {
        spinner.fail("Cleaning failed!")
        console.log(chalk.red(`Error: ${error.message}`))
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

