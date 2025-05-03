const jwt = require('jsonwebtoken');
const {
  jwtSecretKey,
  jwtExpiration,
  jwtRefreshTokenSecret,
  jwtRefreshTokenExpirastion,
} = require('../config');

// token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecretKey, {
    expiresIn: jwtExpiration,
  });

  return token;
};

// refresh token
const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtRefreshTokenSecret, {
    expiresIn: jwtRefreshTokenExpirastion,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecretKey);
const isTokenValidRefreshToken = ({ token }) =>
  jwt.verify(token, jwtRefreshTokenSecret);

module.exports = {
  createJWT,
  createRefreshJWT,
  isTokenValid,
  isTokenValidRefreshToken,
};
