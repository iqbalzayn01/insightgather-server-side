const prisma = require('../config/prisma');
const { BadRequestError, NotFoundError } = require('../errors');
const { GenerateOrderCode } = require('../helpers');

const createOrder = async (req) => {
  const { userId, status } = req.body;

  if (!userId) {
    throw new BadRequestError('userId are required and must be valid.');
  }

  const existingOrder = await prisma.orderItem.findFirst({
    where: {
      order: {
        user: {
          id: Number(userId),
        },
      },
    },
  });

  if (existingOrder) {
    throw new BadRequestError(`You have placed an order for this event.`);
  }

  const orderCode = GenerateOrderCode();

  const result = await prisma.order.create({
    data: {
      code: orderCode,
      status,
      userId: Number(userId),
    },
    select: {
      id: true,
      code: true,
      status: true,
      userId: true,
      createdAt: true,
    },
  });

  return result;
};

const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      code: true,
      status: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      OrderItem: {
        select: {
          id: true,
          orderId: true,
          quantity: true,
          subtotal: true,
          event: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
      },
      createdAt: true,
    },
  });

  if (!result || result.length === 0) {
    throw new NotFoundError('There is no data available.');
  }

  const formattedResult = result.map((order) => ({
    ...order,
    OrderItem: order.OrderItem.map((item) => ({
      ...item,
      subtotal: Number(item.subtotal),
    })),
  }));

  return formattedResult;
};

const getOneOrder = async (req) => {
  const { id } = req.params;

  const result = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      code: true,
      status: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      OrderItem: {
        select: {
          id: true,
          orderId: true,
          quantity: true,
          subtotal: true,
          event: {
            select: {
              id: true,
              name: true,
              status: true,
            },
          },
        },
      },
      createdAt: true,
    },
  });

  if (!result) {
    throw new NotFoundError(`There is no order with id ${id}`);
  }

  const formattedResult = {
    ...result,
    OrderItem: result.OrderItem.map((item) => ({
      ...item,
      subtotal: Number(item.subtotal),
    })),
  };

  return formattedResult;
};

const deleteOrder = async (req) => {
  const { id } = req.params;
  const existing = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existing) {
    throw new NotFoundError(`Order with id ${id} not found`);
  }

  await prisma.orderItem.deleteMany({
    where: {
      orderId: Number(id),
    },
  });

  await prisma.order.delete({ where: { id: Number(id) } });

  return { msg: `Order with Id ${id} deleted successfully` };
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
  getOneOrder,
  deleteOrder,
  checkingOrders,
};
