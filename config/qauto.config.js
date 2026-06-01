const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space/',
    allowCypressEnv: true,
    specPattern: 'cypress/e2e/**/*.cy.js',

    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    },

    env: {
      userEmail: 'test_prod@example.com',
      userPassword: '6WiiW!9LTxAQBWW'
    }
  }
});