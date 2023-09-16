import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { viteStaticCopy } from 'vite-plugin-static-copy';

const copyFiles = {
  targets: [
    {
      src: 'node_modules/olm/olm.wasm',
      dest: '',
    }
  ],
}
export default defineConfig({
  plugins: [
    viteStaticCopy(copyFiles),
    solid()
  ],
})
