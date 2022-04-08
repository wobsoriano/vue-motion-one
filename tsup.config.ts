import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['@motionone/animation', '@motionone/dom'],
  dts: true,
  minify: true,
})
