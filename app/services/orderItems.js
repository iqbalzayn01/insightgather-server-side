const prisma = require('../config/prisma');
const { BadRequestError, NotFoundError } = require('../errors');
const { checkingEvents } = require('./events');
const { checkingOrders } = require('./orders');

const createOrderItem = async (req) => {
  const { orderId, eventId, quantity } = req.body;

  await checkingOrders(orderId);
  await checkingEvents(eventId);

  const event = await prisma.event.findUnique({
    where: {
      id: Number(eventId),
    },
  });

  const subtotal = BigInt(event.price) * BigInt(quantity);

  const orderItem = await prisma.orderItem.create({
    data: {
      orderId,
      eventId,
      quantity,
      subtotal,
    },
  });

  return {
    ...orderItem,
    subtotal: Number(orderItem.subtotal),
  };
};

const getAllOrderItems = async () => {
  const result = await prisma.orderItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      order: {
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
        },
      },
      event: {
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
      quantity: true,
      subtotal: true,
      createdAt: true,
    },
  });

  if (!result || result.length === 0) {
    throw new NotFoundError('There is no data available.');
  }

  const formattedResult = result.map((item) => ({
    ...item,
    subtotal: Number(item.subtotal),
  }));

  return formattedResult;
};

module.exports = {
  createOrderItem,
  getAllOrderItems,
};
