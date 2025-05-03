const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  supabaseUrl: process.env.PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.PUBLIC_SUPABASE_KEY,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtRefreshTokenExpirastion: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
};
