// check validConfig.js in npm 
// source https://jestjs.io/docs/en/configuration

module.exports = {
  // "moduleNameMapper": {
  //   "^.*\\.scss$": "<rootDir>/jest.style.js",// replace any scss file with fake jest.style.js 
  // }

  setupFiles:['./enzyme.config.js'],
  coverageThreshold: {
    "global": {
      "branches": 95,
      "functions": 100,
      "lines": 98,
      "statements": 100
    }
  }
};