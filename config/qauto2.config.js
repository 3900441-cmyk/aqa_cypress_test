import { defineConfig } from 'cypress';
import baseConfig from '../cypress.config.js';

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/', 
    env: {
      userEmail: 'another_test@example.com',
      userPassword: '3eWWbzq!LDMLhTd'
    }
  }
});