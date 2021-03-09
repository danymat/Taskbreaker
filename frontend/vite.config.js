import vue from '@vitejs/plugin-vue'
let hostname = process.env.NODE_ENV === 'production'? '' : 'localhost'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  server: {
    port: 8000,
    proxy: {
      '/api': {
        target: `http://localhost:3000`,
        changeOrigin: true,
        secure: false
      },
    }
  },


}
