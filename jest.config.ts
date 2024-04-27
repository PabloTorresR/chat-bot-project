import { defaults as tsjPreset } from 'ts-jest/presets';

const config = {
  transform: tsjPreset.transform,
  roots: ['./src'],
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: ['src/**/**.ts'],

  verbose: false,
};

export default config;
