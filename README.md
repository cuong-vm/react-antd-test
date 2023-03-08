# Getting Started with React Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Writing Tests

You can write React tests for Ant Design and Axios with `test-helpers` utilities.

### Test Helpers

List of test utilities

- `setupTests.ts`: Prepare and clean up for all or each test
- `test-helpers/api-mock.ts`: API mock with Axios
- `test-helpers/route-mock.ts`: Route mock
- `test-helpers/storage-mock.ts`: localStorage mock
- `test-helpers/test-data.ts`: Test data that can be a Redux store data or an API response
- `test-helpers/test-store.ts`: Mock for Redux store
- `test-helpers/test-wrap.ts`: Custom functions to interact with some Ant Design components like Select

### Steps

- Create test data and save it into `test-helpers/test-data.ts`
- If you extend Redux store, add your test data to `test-helpers/test-data.ts`
- Write Test Suites. Please check examples inside `__tests__` subfolders.

### Run

These are commands for test excution

- `yarn test`: Run all tests without coverage report
- `yarn test --coverage`: Run all tests with coverage report. When they are finished, test report is created in `coverage` folder. Open `coverage/lcov-report/index.html` to see the report in detail.
- `yarn test <test.file.tsx>`: Run a test file alone. Example: `yarn test UserPage.test.tsx`
