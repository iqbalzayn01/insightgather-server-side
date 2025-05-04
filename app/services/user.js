const prisma = require('../config/prisma');
const {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
} = require('../errors');

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      role: true,
      avatar: true,
      createdAt: true,
    },
  });

  return result;
};

const getOneUser = async (req) => {
  const { id } = req.params;

  const result = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!result) {
    throw new NotFoundError(`There is no user with id ${id}`);
  }

  return result;
};

module.exports = {
  getAllUsers,
  getOneUser,
};
