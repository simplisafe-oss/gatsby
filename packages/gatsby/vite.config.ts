/// <reference types="vitest" />
import { defineConfig } from 'vite'

import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/gatsby',

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      enabled: true,
      reportsDirectory: './coverage',
      reporter: ['text'],
      provider: 'v8',
      functions: 100,
      statements: 100,
      branches: 80,
    },
  },
})
