const prisma = require('../config/prisma');
const { NotFoundError } = require('../errors');

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

  if (!result || result.length === 0) {
    throw new NotFoundError('There is no data available.');
  }
};

const getOneUser = async (req) => {
  const { id } = req.params;

  const result = await prisma.user.findUnique({
    where: { id: Number(id) },
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

  if (!result) {
    throw new NotFoundError(`There is no user with id ${id}`);
  }

  return result;
};

const updateUser = async (req) => {
  const { id } = req.params;
  const { name, phoneNumber } = req.body;

  const existing = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existing) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  const result = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      phoneNumber,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      avatar: true,
      role: true,
      updatedAt: true,
    },
  });

  return result;
};

const deleteUser = async (req) => {
  const { id } = req.params;
  const existing = await prisma.user.findUnique({ where: { id: Number(id) } });

  if (!existing) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return { msg: `User with Id ${id} deleted successfully` };
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
