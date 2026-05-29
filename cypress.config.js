import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: true,
  watchForFileChanges: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  screenshotOnRunFailure: true,
  
  e2e: {
    baseUrl: 'https://qauto.forstudy.space/',
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },
});
