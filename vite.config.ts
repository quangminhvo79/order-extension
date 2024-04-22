import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'
import manifest from './src/manifest'
const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },

    plugins: [
      crx({ manifest }),
      react({
        include: "**/*.tsx",
      }),
      alias({
        entries: [
          {
            find: '@',
            replacement: resolve(projectRootDir, 'src')
          }
        ]
      })
    ],
  }
})
