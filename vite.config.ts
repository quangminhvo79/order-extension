import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'
import manifest from './src/manifest'
import { uglify } from "rollup-plugin-uglify";
import dotenv from "dotenv"

dotenv.config();
const projectRootDir = resolve(__dirname);
const { BACKEND_DOMAIN, BACKEND_DEV_DOMAIN } = process.env;

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
    define: {
      "process.env": JSON.stringify({
        BACKEND_DOMAIN,
        BACKEND_DEV_DOMAIN
      })
    },
    plugins: [
      crx({ manifest }),
      react(),
      alias({
        entries: [
          {
            find: '@',
            replacement: resolve(projectRootDir, 'src')
          }
        ]
      }),
      uglify()
    ],
  }
})
