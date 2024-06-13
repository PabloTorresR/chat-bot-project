// vite.config.ts
import { defineConfig } from "file:///Users/pablo.torres/Documents/Projects/chat-bot-project/node_modules/vite/dist/node/index.js";
import react from "file:///Users/pablo.torres/Documents/Projects/chat-bot-project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/pablo.torres/Documents/Projects/chat-bot-project/node_modules/vite-tsconfig-paths/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/pablo.torres/Documents/Projects/chat-bot-project/src/apps/chat-app/frontend";
var vite_config_default = defineConfig({
  server: {
    port: 3800,
    proxy: {
      "/api": {
        target: process.env.VITE_API_GATEWAY_URL,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  plugins: [react(), tsconfigPaths()],
  define: {
    global: {}
  },
  resolve: {
    alias: {
      "@chat-app/styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@chat-app/assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@chat-app": path.resolve(__vite_injected_original_dirname, "./src/app"),
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGFibG8udG9ycmVzL0RvY3VtZW50cy9Qcm9qZWN0cy9jaGF0LWJvdC1wcm9qZWN0L3NyYy9hcHBzL2NoYXQtYXBwL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvcGFibG8udG9ycmVzL0RvY3VtZW50cy9Qcm9qZWN0cy9jaGF0LWJvdC1wcm9qZWN0L3NyYy9hcHBzL2NoYXQtYXBwL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9wYWJsby50b3JyZXMvRG9jdW1lbnRzL1Byb2plY3RzL2NoYXQtYm90LXByb2plY3Qvc3JjL2FwcHMvY2hhdC1hcHAvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzODAwLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiBwcm9jZXNzLmVudi5WSVRFX0FQSV9HQVRFV0FZX1VSTCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIHRzY29uZmlnUGF0aHMoKV0sXG4gIGRlZmluZToge1xuICAgIGdsb2JhbDoge30sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0BjaGF0LWFwcC9zdHlsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc3R5bGVzJyksXG4gICAgICAnQGNoYXQtYXBwL2Fzc2V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMnKSxcbiAgICAgICdAY2hhdC1hcHAnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXBwJyksXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd2EsU0FBUyxvQkFBb0I7QUFDcmMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRLFFBQVEsSUFBSTtBQUFBLFFBQ3BCLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDbEMsUUFBUTtBQUFBLElBQ04sUUFBUSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsb0JBQW9CLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDMUQsb0JBQW9CLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDMUQsYUFBYSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQ2hELEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
