import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import components from 'unplugin-vue-components/vite'
// @ts-ignore
import content from '@originjs/vite-plugin-content'
// @ts-ignore
import pages from '@originjs/vite-plugin-pages'
import pluginWasm from './vite-plugin-load-wasm/src/index';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src'),
    }],
  },
  plugins:[
    vue(),
    components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow typescript
      dts: true,
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    content(),
    pages(),
    pluginWasm(),
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
  },
})
