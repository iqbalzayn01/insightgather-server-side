const prisma = require('../config/prisma');
const { BadRequestError, NotFoundError } = require('../errors');
const { checkingEvents } = require('./events');
const { checkingOrders } = require('./orders');

const createOrderItem = async ({ orderId, eventId, quantity }) => {
  checkingOrders(orderId);
  checkingEvents(eventId);

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
