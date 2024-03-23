import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import styleImport from 'vite-plugin-style-import'
export default defineConfig({
  base: './',
  build: {
    outDir: process.env.VITE_OUTDIR || 'dist',
    target: 'chrome63'
  },
  server: {
    port: 5200,
    host: '0.0.0.0',
    proxy: {
      '/java-api/': {
        target: 'http://172.16.208.12:18430',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp(`^/java-api/`), '/')
      }
    }
  },

  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'static', replacement: path.resolve(__dirname, 'public/static') },
      { find: 'typings', replacement: path.resolve(__dirname, 'typings') },
    ]
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/theme.scss";
      `
      },
      less: {
        javascriptEnabled: true,
        // 覆盖样式变量
        modifyVars: {
          hack: `true; @import "./src/assets/styles/vant.less";`
        }
      }
    }
  },

  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name: string) => `vant/es/${name}/style/less`
        }
      ]
    }),
    legacy({
      targets: ['Chrome 63'],
      modernPolyfills: true
    }),
  ]
})
