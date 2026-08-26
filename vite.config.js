import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// Stamps a build-time version and exposes it both as an embedded constant
// (__APP_VERSION__) and as /version.json, so the running app can detect
// when a newer build has been deployed and prompt the user to reload.
function versionStampPlugin() {
  const version = Date.now().toString()

  return {
    name: 'version-stamp',
    config() {
      return {
        define: {
          __APP_VERSION__: JSON.stringify(version),
        },
      }
    },
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ version }))
      })
    },
    writeBundle(options) {
      const outDir = options.dir || 'dist'
      fs.writeFileSync(
        path.join(outDir, 'version.json'),
        JSON.stringify({ version })
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
