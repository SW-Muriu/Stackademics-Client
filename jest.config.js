module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['./src/app/**'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './coverage',
        outputName: 'test-results.xml',
      },
    ],
  ],
  moduleNameMapper: {
    jspdf: '<rootDir>/setup-jest.ts',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  resetMocks: true,
};
