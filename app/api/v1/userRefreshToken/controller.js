const { getUserRefreshToken } = require('../../../services/userRefreshToken');
const { status } = require('http-status');

const index = async (req, res, next) => {
  try {
    const result = await getUserRefreshToken(req);

    res.status(status.OK).json({
      token: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index };
