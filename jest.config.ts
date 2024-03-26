import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: [
    "/__tests__/utils/"
  ],
  testTimeout:20000000,
  preset: "@shelf/jest-mongodb"

};
export default config;