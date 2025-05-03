const prisma = require('../config/prisma');
const {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} = require('../errors');
const { createTokenUser, createJWT, createRefreshJWT } = require('../utils');
const { createUserRefreshToken } = require('./userRefreshToken');

const login = async (req) => {
  const { email, passowrd } = req.body;

  if (!email || !passowrd) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const isPasswordCorrect = await result.comparePassword(passowrd);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  let role = result.role;
  const tokenPayload = createTokenUser(result);
  const token = createJWT({ payload: tokenPayload });
  const refreshToken = createRefreshJWT({ payload: tokenPayload });

  if (role === 'superadmin' || role === 'participant') {
    await createUserRefreshToken({ refreshToken, user: result.id });
  }

  return {
    token,
    refreshToken,
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
};

const getUserLogged = async (req, res, next) => {
  const userId = req.user.id;
  const result = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!result) {
    throw new UnauthorizedError('Invalid');
  }

  return result;
};

module.exports = {
  login,
  getUserLogged,
};
