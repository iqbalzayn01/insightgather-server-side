const prisma = require('../config/prisma');
const {
  isTokenValidRefreshToken,
  createJWT,
  createTokenUser,
} = require('../utils');
const { NotFoundError } = require('../errors');

const createUserRefreshToken = async (payload) => {
  const result = await prisma.refreshToken.create({
    data: {
      refreshToken: payload.refreshToken,
      userId: payload.userId,
    },
  });
  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await prisma.refreshToken.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });

  if (!result) {
    throw new NotFoundError('Refresh Token tidak valid');
  }

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = {
  createUserRefreshToken,
  getUserRefreshToken,
};
