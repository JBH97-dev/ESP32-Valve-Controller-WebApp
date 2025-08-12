import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    output: {
			bundleStrategy: 'inline'
		},
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "index.html",
      precompress: false,
      strict: false, // Set to false to avoid strict import resolution issues
    }),
    prerender: {
      handleHttpError: "warn",
      entries: ["/"], // Only prerender the main page
    },
    serviceWorker: {
      register: false,
    },
    files: {
      assets: "static",
      hooks: {
        client: "src/hooks.client",
        server: "src/hooks.server",
      },
      lib: "src/lib",
      params: "src/params",
      routes: "src/routes",
      serviceWorker: "src/service-worker",
      appTemplate: "src/app.html",
      errorTemplate: "src/error.html",
    },
  },
}

export default config
