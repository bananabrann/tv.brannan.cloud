import preprocess from "svelte-preprocess";
import adapter from "svelte-adapter-azure-swa";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      }
    })
  ],

  kit: {
    version: {
      name: process.env.npm_package_version
    },

    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      esbuildOptions: {
        keepNames: true
      },
      customStaticWebAppConfig: {
        platform: {
          apiRuntime: "node16"
        }
      }
    })
  }
};

export default config;
