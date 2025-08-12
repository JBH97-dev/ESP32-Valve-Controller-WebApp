import tailwindcss from "@tailwindcss/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    cssCodeSplit: false,
    sourcemap: false,
    target: "es2018",
  },

  resolve: {
    alias: {
      $app: "@sveltejs/kit/src/runtime/app",
      $lib: "src/lib",
    },
  },
})
