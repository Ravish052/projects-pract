export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: [
    'controller/**/*.js',
    '!controller/__tests__/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
