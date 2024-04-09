const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(
  withNx(),
  (config) => {
    // Add CopyWebpackPlugin to copy the root package.json to dist

    return config;
  }
);