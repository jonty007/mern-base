const jwt = require('jwt-simple'),
  { jwtTokenSecret, tokenTimeToExpire } = require('../config');

const createJWT = function({ data, exp, secret = jwtTokenSecret, hash_type = 'HS512' } = {}) {
  const now = Date.now(),
    defaultTimeToExpire = now + tokenTimeToExpire,
    defaults = {
      iat: now
    };

  // set to -1 to skip expiry
  if (exp !== -1) {
    defaults.exp = exp || defaultTimeToExpire;
  }

  const payload = {
    ...defaults,
    ...data
  };

  return jwt.encode(payload, secret, hash_type);
};

const decodeJWT = function({
  token,
  noVerify = false,
  secret = jwtTokenSecret,
  hash_type = 'HS512'
} = {}) {
  const decoded = jwt.decode(token, secret, noVerify, hash_type);
  if (decoded && decoded.exp && decoded.exp <= Date.now()) {
    throw new Error('Token expired');
  }

  return decoded;
};

module.exports = {
  createJWT,
  decodeJWT
};
