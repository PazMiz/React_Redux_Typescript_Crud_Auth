const path = require('path');

module.exports = function override(config) {
  // Add fallbacks for required modules
  config.resolve.fallback = {
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/')
  };

  // Resolve the 'buffer' package
  config.resolve.alias['buffer'] = require.resolve('buffer/');

  return config;
};
