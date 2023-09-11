import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: '.',
});

const customConfig: Config = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    // Ignore *enum*
    // Ignore *constants*
  ],
};

module.exports = createJestConfig(customConfig);
