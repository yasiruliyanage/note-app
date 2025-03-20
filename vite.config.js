import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.js",
      // New recommended configuration
      pool: "forks", // Use 'forks' instead of 'threads' for better React support
      watch: false,
      css: false,
      include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: ["node_modules/", "src/test/setup.ts"],
      },
    },
    resolve: {
      conditions: ["development", "browser"],
    },
})
