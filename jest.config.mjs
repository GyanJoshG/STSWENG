/** @type {import('jest').Config} */
const config = {
  testTimeout: 120000,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-node",
  transform: {
    "^.+\\.m?js$": "babel-jest",  
  },
  setupFilesAfterEnv: ['jest-fetch-mock'],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    '/node_modules/(?!your-esm-package-to-transform)', 
  ],
  "modulePaths": [
  "<rootDir>"
  ],
};

export default config;
