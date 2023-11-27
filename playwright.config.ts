import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './Task2',
  /* Maximum time one test can run for. (including the parallel run!) */
  timeout: 10 * 60 * 1000, // =10min

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 20000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [['junit', { outputFile: 'test-results/results.xml' }]] : 'html',
  // Browers for the project
  projects: [
    {
      name: 'chromium',
      use: { ...require('playwright').devices['Desktop Chromium'] }, // Chromium configuration goes here
    },
    {
      name: 'firefox',
      use: { ...require('playwright').devices['Desktop Firefox'] }, // Firefox configuration goes here
    },
    {
      name: 'webkit',
      use: { ...require('playwright').devices['Desktop WebKit'] }, // WebKit configuration goes here
    },
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /*BaseURL for the project*/
    baseURL: 'https://shop.mercedes-benz.com',

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 15 * 1000,

    /* Maximum time, navigation related. Was not added by defaults (no limit?). */
    navigationTimeout: 15 * 1000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Avoid warning page for unsecure URls without https for example (recurrent in firefox) */
    ignoreHTTPSErrors: true,

    /**
     * Change default data attribute, `getByTestId('element')` will globally target [data-e2e="element"],
     * instead of default `data-testid` attribute, to match the Payplug locator convention.
     */
    testIdAttribute: 'data-e2e',
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
}

export default config