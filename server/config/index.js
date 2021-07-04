const path = require('path');

// All configurations will extend these options
// ============================================
let all = {
  name: 'MERN Base',
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '..'), // Root path of server
  port: process.env.PORT || 4001, // Server port
  jwtTokenSecret:
    'helloworld',
  // serverRootPath: "/api",
  logLevel: process.env.LOG_LEVEL || 'debug',
  tokenTimeToExpire: 4 * 60 * 60 * 1000 // 4 hours
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign(all, require('./environment/' + process.env.NODE_ENV + '.js') || {});
