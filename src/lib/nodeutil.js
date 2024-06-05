import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

function node_impurities() {
    globalThis.__filename = fileURLToPath(import.meta.url)
    globalThis.__dirname = dirname(__filename)
}

export { node_impurities }
