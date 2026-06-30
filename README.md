# Playwright SauceDemo

A robust end-to-end test automation framework for the SauceDemo web application, built with Playwright and TypeScript. This project demonstrates a production-style testing approach using the Page Object Model (POM), reusable fixtures, centralized test data, browser automation, and rich reporting.

## Overview

This repository automates the core user journeys of SauceDemo, including:

- Login and authentication flow
- Inventory browsing and product validation
- Adding and removing products from the cart
- Cart verification and checkout flow
- Invalid and valid customer detail handling
- Cross-browser execution in Chromium, Firefox, and WebKit

The suite is designed to be reliable, maintainable, and easy to extend as the web application evolves.

## Objectives

This project aims to provide:

- A maintainable automation structure for UI regression testing
- Reusable page-level abstractions for stable test interactions
- A clear separation between test logic, test data, and page implementations
- Cross-browser validation for consistent user experience coverage
- Report generation and artifact retention for debugging and analysis

## Technology Stack

- Playwright Test for browser automation and assertions
- TypeScript for type-safe test code
- dotenv for configuration management
- ReportPortal integration for test reporting
- Node.js and npm for project execution

## Project Structure

```text
.
├── tests/                     # End-to-end tests
│   ├── auth.setup.ts
│   ├── cartPage.spec.ts
│   ├── checkoutPage.spec.ts
│   ├── inventoryPage.spec.ts
│   ├── itemPage.spec.ts
│   └── loginPage.spec.ts
├── lib/
│   ├── datafactory/           # Test data providers
│   │   ├── customersFactory.ts
│   │   └── productsFactory.ts
│   ├── fixtures/              # Custom Playwright fixtures
│   │   └── pages.fixtures.ts
│   ├── interfaces/            # TypeScript interfaces for domain entities
│   └── pages/                 # Page Object Model classes
│       ├── cartPage.ts
│       ├── checkoutPage.ts
│       ├── inventoryPage.ts
│       ├── itemPage.ts
│       └── loginPage.ts
├── playwright.config.ts       # Browser projects, test setup, and reporter config
├── package.json               # Scripts and dependencies
└── README.md                  # Project documentation
```

## Architecture Highlights

### Page Object Model

The UI interactions are abstracted into dedicated page classes under the [lib/pages](lib/pages) directory. This keeps test cases readable and isolates selectors and UI behavior from business assertions.

### Custom Fixtures

The test suite uses shared fixtures defined in [lib/fixtures/pages.fixtures.ts](lib/fixtures/pages.fixtures.ts), enabling each test to access reusable page objects through a consistent interface.

### Authentication Setup

A dedicated setup project in [tests/auth.setup.ts](tests/auth.setup.ts) authenticates the user and stores browser state in the Playwright auth directory. This allows other tests to reuse the authenticated session without repeated login steps.

### Data-Driven Testing

Reusable product and customer data are centralized in [lib/datafactory/productsFactory.ts](lib/datafactory/productsFactory.ts) and [lib/datafactory/customersFactory.ts](lib/datafactory/customersFactory.ts), making it easier to maintain scenarios and expand coverage.

## Prerequisites

Before running the suite, ensure the following are installed:

- Node.js 18 or later
- npm 9 or later

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pierremondejar/playwright-saucedemo.git
   cd playwright-saucedemo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browser binaries:

   ```bash
   npx playwright install
   ```

4. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   If no `.env.example` file exists, create a `.env` manually with the required values:

   ```env
   BASEURL=https://www.saucedemo.com
   STANDARD_USERNAME=standard_user
   STANDARD_PASSWORD=secret_sauce
   ```

   Optional values for ReportPortal:

   ```env
   RPAPIKEY=your_reportportal_api_key
   ```

## Running Tests

Run the full suite:

```bash
npm test
```

Run a specific browser project:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test tests/checkoutPage.spec.ts
```

Run a specific test case:

```bash
npx playwright test tests/inventoryPage.spec.ts --grep "add products"
```

## Test Coverage

The current suite covers:

- Inventory page validation
- Cart interactions
- Checkout form validation
- Successful order completion
- Sorting and product detail verification
- Cross-browser execution

## Reporting and Artifacts

Playwright generates detailed reports and traces during execution. To view the local HTML report:

```bash
npx playwright show-report
```

Artifacts such as screenshots, traces, and execution logs are written to the `test-results/` directory.

## Configuration Notes

The browser and execution behavior are defined in [playwright.config.ts](playwright.config.ts). Key configuration details include:

- A setup dependency project for authentication
- Separate projects for Chromium, Firefox, and WebKit
- Storage state reuse for authenticated sessions
- Trace collection on first retry
- ReportPortal integration when environment variables are present

## Development Notes

To keep the framework maintainable:

- Prefer extending existing page objects rather than duplicating selectors
- Centralize test data in the data factory layer
- Keep assertions readable and focused on user-visible behavior
- Add new scenarios in the corresponding spec files rather than expanding unrelated helpers

## Troubleshooting

If tests fail unexpectedly:

- Ensure the browser binaries are installed with `npx playwright install`
- Verify the environment variables in `.env`
- Confirm the SauceDemo site is reachable
- Review traces and screenshots in the `test-results/` folder

## License

This project is licensed under the ISC License.
