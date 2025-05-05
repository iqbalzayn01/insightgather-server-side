const { register, login, getUserLogged } = require('../../../services/auth');
const { status } = require('http-status');

const create = async (req, res, next) => {
  try {
    const result = await register(req);

    res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const loginCms = async (req, res, next) => {
  try {
    const result = await login(req);

    res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const userLogged = async (req, res, next) => {
  try {
    const result = await getUserLogged(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  loginCms,
  userLogged,
};
