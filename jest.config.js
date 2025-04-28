// jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["app.js", "sigterm-handler.js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  }
};
