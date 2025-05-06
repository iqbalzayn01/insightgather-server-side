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

module.exports = {
  createOrderItem,
};
