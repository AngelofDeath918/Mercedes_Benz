# Mercedes Benz QA Test - with Playwright

# Mandatory steps:

- Open the Mercedes-Benz Shop used cars in Australian market. (Checked)
- On “Please select your location” fill: (Checked)
  -- Your State: (e.g. 'New South Wales').
  -- Postal Code: (e.g. '2007').
  -- Purpose: Private.
  -- Click the filter button (top-left blue button)
- Under the “Pre-Owned” tab, apply the following choices: (not checked)
  -- Colour:
- Navigate to the Vehicle Details of the most expensive car on the filtered results. (Checked)
- Save the following car details to a file: (Checked)
  -- VIN number
  -- Model Year
- In the side vehicle details click “Enquire Now” (Checked)
- Fill the “Contact Details and Account Creation” form with invalid data. (e.g. with an invalid email format) (Checked)
- Click "Proceed" and validate the error. (Checked)

## Summary

- [Getting started (in local, for creation or debug)](#getting-started-in-local-for-creation-or-debug)
- [Run (in local)](#run-in-local)
- [More](#more)

## Getting started (in local, for creation or debug)

#### Prerequisites

1. yarn global installed (no lower than 1.22.19 recommended)
2. node.js global installed (no lower than 18.7.0 recommended)

#### IDE extensions

- [Playwright](https://open-vsx.org/extension/ms-playwright/playwright)

#### Setup

1. Clone repo with SSH: ``
2. Install all dependencies: `yarn`

### Command examples:

#### Run test:

- `yarn playwright test` -> It will run the test

#### Create/debug test:

- `yarn playwright test --debug`
- `yarn playwright test --ui`
- `yarn playwright test --headed`

#### HTML Test Reports:

- `yarn playwright show-report`
- `yarn playwright show-trace`

## More

- Visit the [official doc.](https://playwright.dev/docs/intro)
