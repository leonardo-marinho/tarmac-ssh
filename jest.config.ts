import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./src",
});

const customConfig: Config = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customConfig);
