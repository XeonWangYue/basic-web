// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    'nuxt-monaco-editor',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-echarts'
  ],
  elementPlus: {
    // 自动导入图标，默认前缀 ElIcon
    icon: 'ElIcon', // 设为 false 可关闭自动导入
    importStyle: 'css', // 按需引入样式
    installMethods: ['ElMessage', 'ElNotification'] // 按需安装方法
  },
  vite: {
    optimizeDeps: {
      include: [
        'dayjs', // CJS
        'dayjs/plugin/*.js',
        'lodash-unified',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  css: ['~/assets/css/main.css', '~/assets/css/codicon.css'],
  imports: {
    autoImport: true // 确保全局自动导入开启（默认就是 true）
  },
  monacoEditor: {
    // 可选配置
    componentName: {
      codeEditor: 'MonacoEditor',   // 自动导入的组件名
      diffEditor: 'MonacoDiffEditor'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8081', // 后端地址
        changeOrigin: true, // 必加：解决跨域
        // secure: false, // 后端HTTPS时开启
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})