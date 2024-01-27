/// <reference types="vitest" />
import path from 'node:path'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/setup.ts'],
    includeSource: ['src/**/*.{ts,tsx}'],
    alias: { '@': path.resolve(__dirname, './src') },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
