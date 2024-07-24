import path from "path"
import fs from "fs/promises"

export const log = console.log
export async function deleteFolderRecursive(folderPath: string) {
  try {
    // 检查文件夹是否存在
    await fs.stat(folderPath)

    const files = await fs.readdir(folderPath)
    await Promise.all(
      files.map(async file => {
        const curPath = path.join(folderPath, file)
        const stat = await fs.stat(curPath)
        if (stat.isDirectory()) {
          await deleteFolderRecursive(curPath)
        } else {
          await fs.unlink(curPath)
        }
      })
    )
    await fs.rmdir(folderPath)
  } catch (error) {
    if ((error as { code?: string }).code === "ENOENT") {
      return
    } else {
      console.error(`Error deleting folder: ${folderPath}`, error)
    }
  }
}

