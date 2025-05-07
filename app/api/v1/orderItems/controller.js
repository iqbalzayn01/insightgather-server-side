const {
  createOrderItem,
  getAllOrderItems,
} = require('../../../services/orderItems');
const { status } = require('http-status');

const create = async (req, res, next) => {
  try {
    const result = await createOrderItem(req);

    res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllOrderItems(req);

    res.status(status.CREATED).json({
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
