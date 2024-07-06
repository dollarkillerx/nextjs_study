import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    permissions: ["proxy", "storage", "unlimitedStorage", "webRequest", "webRequestBlocking", "<all_urls>"],
  },
});