# Testing Setup Guide for Login Component

This guide explains the unit tests created for the `Login.jsx` component and how to set them up.

## Test File Location
- **File**: `src/pages/Login.test.jsx`

## Dependencies Required

Install the following testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest @babel/preset-react @babel/preset-env babel-jest identity-obj-proxy
```

Or with yarn:
```bash
yarn add --dev @testing-library/react @testing-library/jest-dom jest @babel/preset-react @babel/preset-env babel-jest identity-obj-proxy
```

## Configuration Files Needed

### 1. Create `jest.config.js` in the project root:

```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
```

### 2. Create `src/setupTests.js`:

```javascript
import '@testing-library/jest-dom';
```

### 3. Update `.babelrc` (or create it):

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

### 4. Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Running Tests

After setup is complete:

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Coverage

The test suite includes **11 comprehensive tests** covering:

1. **Component Rendering**
   - Form renders with all input fields
   - Sign in heading is displayed
   - Register link is present

2. **Form Input Handling**
   - Email input changes
   - Password input changes
   - Confirm password input changes

3. **Form Submission**
   - Submits with correct data to API
   - Calls axios.post with correct endpoint and credentials

4. **Authentication Logic**
   - Sets `isAuthenticated` to true on success
   - Updates user context with response data
   - Clears form inputs after successful login
   - Navigates to home page after login

5. **Toast Notifications**
   - Shows success toast on successful login
   - Shows error toast on login failure

6. **Error Handling**
   - Handles API errors gracefully
   - Displays error message from server

7. **Edge Cases**
   - Prevents default form submission
   - Doesn't navigate when already authenticated

## Known Issues in Login.jsx

The test file reveals the following issue in the actual component:

**Missing axios import**: The `Login.jsx` file uses `axios.post()` but doesn't import axios. Add this to the top of the file:

```javascript
import axios from 'axios'
```

## Function Coverage

### handleLogin()
- Makes POST request to authentication API
- Handles both success and error cases
- Updates authentication state
- Shows appropriate toast messages
- Clears form inputs
- Navigates user after successful login

## Notes

- Tests use Jest for the testing framework
- React Testing Library is used for component testing (recommended by React)
- All external dependencies (axios, toast, react-router) are properly mocked
- Tests follow best practices by testing user behavior rather than implementation details
