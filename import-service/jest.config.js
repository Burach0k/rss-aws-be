module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: [
    'node_modules/(?!(fetch-blob|node-fetch)/)'
],
  collectCoverageFrom: [
    "!swagger"
  ]
};
