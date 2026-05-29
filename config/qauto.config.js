import { defineConfig } from 'cypress';
import baseConfig from '../cypress.config.js';

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/', 
    env: {
      userEmail: 'test_prod@example.com',
      userPassword: '6WiiW!9LTxAQBWW'
    }
  }
});