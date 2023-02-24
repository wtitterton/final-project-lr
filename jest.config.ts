export default {
  cacheDirectory: "./node_modules/.cache/jest",
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "./tsconfig.jest.json",
    },
  },
  preset: "ts-jest",
};