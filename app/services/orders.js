const prisma = require('../config/prisma');
const { BadRequestError, NotFoundError } = require('../errors');
const { GenerateOrderCode } = require('../helpers');

const createOrder = async (req) => {
  const { userId, status } = req.body;

  if (!userId) {
    throw new BadRequestError('userId are required and must be valid.');
  }

  const existingOrder = await prisma.order.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (existingOrder) {
    throw new BadRequestError(
      `The user (${existingOrder.userId}) has placed an order (${existingOrder.code}).`
    );
  }

  const orderCode = GenerateOrderCode();

  const result = await prisma.order.create({
    data: {
      code: orderCode,
      status,
      userId: Number(userId),
    },
    include: { OrderItem: true },
  });

  return result;
};

const getAllOrders = async () => {
  console.log('TEST:');
  const result = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      code: true,
      status: true,
      userId: true,
      createdAt: true,
    },
    // include: {
    //   user: true,
    //   OrderItem: true,
    // },
  });

  if (!result || result.length === 0) {
    throw new NotFoundError('There is no data available.');
  }

  return result;
};

const checkingOrders = async (id) => {
  const result = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!result) {
    throw new NotFoundError(`Order with id ${id} not found`);
  }

  return result;
};

module.exports = {
  createOrder,
  getAllOrders,
  checkingOrders,
};
