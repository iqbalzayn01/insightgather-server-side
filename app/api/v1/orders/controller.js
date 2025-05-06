const { createOrder, getAllOrders } = require('../../../services/orders');
const { status } = require('http-status');

const create = async (req, res, next) => {
  try {
    const result = await createOrder(req);

    res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
};
