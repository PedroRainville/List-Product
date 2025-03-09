import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://lojadetestescarol.commercesuite.com.br',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/web_api') 
      }
    }
  }
});