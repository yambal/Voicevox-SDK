module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Optional, but recommended:
  roots: ["<rootDir>/src"],
  testMatch: ['**/src/tests/**/*.test.[jt]s?(x)'],
};
