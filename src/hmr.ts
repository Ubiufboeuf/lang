import { resolve } from 'node:path'
import { watch } from 'node:fs'
import { readFile } from 'node:fs/promises'

interface Options {
  execOnLoad?: boolean
  delay?: number
}

export async function hmr (desiredPath: string, callback: (fileContent: string) => void, { execOnLoad, delay = 50}: Options) {
  const absolutePath = resolve(desiredPath)
  let timeout: ReturnType<typeof setTimeout> | null = null

  async function executeCode () {
    try {
      const fileContent = await readFile(absolutePath, 'utf8')
      callback(fileContent)
    } catch (err) {/* empty */}
  }

  if (execOnLoad) await executeCode()
  
  return watch(absolutePath, (eventType) => {
    if (eventType !== 'change' && eventType !== 'rename') return

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(async () => {
      await executeCode()
    }, delay)
  })
}