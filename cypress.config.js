import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  watchForFileChanges: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: 'https://example.cypress.io/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
