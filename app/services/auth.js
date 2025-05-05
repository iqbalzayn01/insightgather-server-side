const prisma = require('../config/prisma');
const {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} = require('../errors');
const { createTokenUser, createJWT, createRefreshJWT } = require('../utils');
const { createUserRefreshToken } = require('./userRefreshToken');
const bcrypt = require('bcryptjs');

const register = async (req) => {
  const { name, email, password, confirmPassword, phoneNumber, role } =
    req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new BadRequestError('This email address is already in use');
  }

  if (password !== confirmPassword) {
    throw new BadRequestError(
      'Password and confirmation password do not match. Please try again.'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    },
  });

  const { password: _, ...safeUser } = result;

  return safeUser;
};

const login = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const comparePassword = await bcrypt.compare(password, result.password);

  if (!comparePassword) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  let role = result.role;
  const tokenPayload = createTokenUser(result);
  const token = createJWT({ payload: tokenPayload });
  const refreshToken = createRefreshJWT({ payload: tokenPayload });

  if (role === 'superadmin' || role === 'participant') {
    await createUserRefreshToken({ refreshToken, userId: result.id });
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
  register,
  login,
  getUserLogged,
};
