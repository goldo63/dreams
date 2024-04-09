const { composePlugins, withNx } = require('@nx/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = composePlugins(
  withNx(),
  (config) => {
    // Add CopyWebpackPlugin to copy the root package.json to dist
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: '../../package.json', to: 'package.json' } // Adjust the paths if needed
        ]
      })
    );
    return config;
  }
);