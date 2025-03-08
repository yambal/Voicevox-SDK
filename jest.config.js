module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Optional, but recommended:
  roots: ["<rootDir>/dist"],
  testMatch: ['**/dist/tests/**/*.test.[jt]s?(x)'],
};
