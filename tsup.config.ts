import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: {
    index: 'src/index.ts',
    runtime: 'src/runtime.ts',
  },
  dts: true,
  clean: true,
  sourcemap: true,
})
