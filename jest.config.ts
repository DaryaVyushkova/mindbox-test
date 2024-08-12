import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^context/(.*)$': '<rootDir>/src/context/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^Forms/(.*)$': '<rootDir>/src/Forms/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
}

export default config
