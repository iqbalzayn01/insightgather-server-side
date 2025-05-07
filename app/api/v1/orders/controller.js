const {
  createOrder,
  getAllOrders,
  getOneOrder,
  deleteOrder,
} = require('../../../services/orders');
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

const find = async (req, res, next) => {
  try {
    const result = await getOneOrder(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteOrder(req);

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
  find,
  destroy,
};
