const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add the 'util' polyfill
  config.plugins.push(
    new webpack.ProvidePlugin({
      util: 'util',
    })
  );

  return config;
};