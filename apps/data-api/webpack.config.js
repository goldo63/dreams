const { composePlugins, withNx } = require('@nx/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = composePlugins(
  withNx(),
  (config) => {
    // Add CopyWebpackPlugin to copy the root package.json to dist

    return config;
  }
);