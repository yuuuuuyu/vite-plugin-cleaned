export type PluginOptions = {
  folder: string | string[]
  hooks?: {
    buildStart?: () => void | Promise<void>
    closeBundle?: () => void | Promise<void>
  }
}
