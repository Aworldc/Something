/**
 * Inserts a few shims into the global object.
 */
function node_impurities() {
    import('node:url').then(url => {
        import('node:path').then(path => {
            globalThis.__filename = fileURLToPath(import.meta.url)
            globalThis.__dirname = dirname(__filename)
        })
    })
}

export { node_impurities }
