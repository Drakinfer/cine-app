/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest" // pour les fichiers JavaScript, si nécessaire
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)" // Ne pas ignorer axios
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  globals: {
    "ts-jest": {
      useESM: true // Active le support ESM pour ts-jest
    }
  }
};

