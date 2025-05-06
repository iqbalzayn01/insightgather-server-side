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
      userId: Number(userId),
    },
  });

  if (existingOrder) {
    throw new BadRequestError(
      `The user ${existingOrder.userId} has placed an order.`
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
  checkingOrders,
};
