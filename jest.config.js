module.exports = {
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
};
