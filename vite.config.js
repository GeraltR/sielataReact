import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Main build identifier, computed once when Vite starts
// (when dev server or build).
//
// Exposed both as an importable module (virtual:app-version) and
// as /version.json, allowing the running app to detect when a newer
// build has been deployed and prompt the user to reload.

const APP_VERSION = Date.now().toString()

const virtualModuleId = 'virtual:app-version'
const resolvedVirtualModuleId = '\0' + virtualModuleId

function versionStampPlugin() {
  return {
    name: 'version-stamp',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const APP_VERSION = ${JSON.stringify(APP_VERSION)}`
      }
    },
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ version: APP_VERSION }))
      })
    },
    writeBundle(options) {
      const outDir = options.dir || 'dist'
      fs.writeFileSync(
        path.join(outDir, 'version.json'),
        JSON.stringify({ version: APP_VERSION })
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    strictPort: true,
    host: '0.0.0.0', // *** Added by me because of the
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    versionStampPlugin(),
  ],
})
