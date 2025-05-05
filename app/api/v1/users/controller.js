const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../../../services/user');
const { status } = require('http-status');

const index = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneUser(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateUser(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteUser(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  find,
  update,
  destroy,
};
