const {
  createEvents,
  getAllEvents,
  getOneEvent,
  deleteEvent,
} = require('../../../services/events');
const { status } = require('http-status');

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);

    res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    res.status(status.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvent(req);

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
