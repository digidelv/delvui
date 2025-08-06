module.exports = {
  projects: [
    '<rootDir>/packages/*/jest.config.js'
  ],
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/**/*.stories.{js,ts,tsx}',
    '!packages/*/src/**/*.test.{js,ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: [
    '<rootDir>/packages/*/src/**/*.test.{js,ts,tsx}',
    '<rootDir>/packages/*/src/**/*.spec.{js,ts,tsx}'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/es/',
    '/dist/'
  ]
};