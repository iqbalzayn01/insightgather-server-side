const {
  createCheckout,
  deleteCheckout,
} = require('../../../services/checkout');
const { status } = require('http-status');

const checkout = async (req, res, next) => {
  try {
    const result = await createCheckout(req);

    res.status(status.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCheckout(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkout,
  destroy,
};
