const prisma = require('../config/prisma');
const { BadRequestError, NotFoundError } = require('../errors');
const { GenerateOrderCode } = require('../helpers');
const { checkingEvents } = require('./events');

const createCheckout = async (req) => {
  const { userId, items } = req.body;

  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    throw new BadRequestError('userId and items are required.');
  }

  const orderCode = GenerateOrderCode();

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        code: orderCode,
        status: 'pending',
        userId: Number(userId),
      },
    });

    const orderItems = await Promise.all(
      items.map(async ({ eventId, quantity }) => {
        await checkingEvents(eventId);

        const event = await tx.event.findUnique({
          where: { id: Number(eventId) },
        });

        return tx.orderItem.create({
          data: {
            orderId: order.id,
            eventId: Number(eventId),
            quantity,
            subtotal: BigInt(event.price) * BigInt(quantity),
          },
        });
      })
    );

    return {
      order,
      orderItems: orderItems.map((item) => ({
        ...item,
        subtotal: Number(item.subtotal),
      })),
    };
  });
};

const deleteCheckout = async (req) => {
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

module.exports = {
  createCheckout,
  deleteCheckout,
};
