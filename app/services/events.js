const prisma = require('../config/prisma');
const { uploadFile, deleteFile } = require('../config/supabase');
const { BadRequestError, NotFoundError } = require('../errors');

const createEvents = async (req) => {
  const { name, description, status, location, price, quota } = req.body;

  const existing = await prisma.event.findUnique({
    where: {
      name,
    },
  });

  if (existing) {
    throw new BadRequestError('This events is already in use');
  }

  const file = req.file;

  if (!name || !description || !status || !location || !price || !quota) {
    throw new BadRequestError('Please complete all required fields.');
  }

  if (!file) {
    throw new BadRequestError('Image is required');
  }

  const filename = await uploadFile(file, 'events');

  const result = await prisma.event.create({
    data: {
      name,
      description,
      status,
      location,
      price: BigInt(price),
      images: [filename],
      quota: parseInt(quota),
    },
  });

  const formattedResult = {
    ...result,
    price: Number(result.price),
    quota: Number(result.quota),
  };

  return formattedResult;
};

const getAllEvents = async () => {
  const result = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      location: true,
      price: true,
      images: true,
      quota: true,
    },
  });

  if (!result || result.length === 0) {
    throw new NotFoundError('There is no data available.');
  }

  const formattedResult = result.map((event) => ({
    ...event,
    price: Number(event.price),
    quota: Number(event.quota),
  }));

  return formattedResult;
};

const getOneEvent = async (req) => {
  const { id } = req.params;

  const result = await prisma.event.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      location: true,
      price: true,
      images: true,
      quota: true,
    },
  });

  if (!result) {
    throw new NotFoundError(`There is no user with id ${id}`);
  }

  const formattedResult = {
    ...result,
    price: Number(result.price),
    quota: Number(result.quota),
  };

  return formattedResult;
};

const updateEvent = async (req) => {
  const { id } = req.params;
  const { name, description, status, location, price, quota } = req.body;
  const file = req.file;

  const existing = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existing) {
    throw new NotFoundError(`Event with id: ${id} not found`);
  }

  let updateImage = existing.images;

  if (file) {
    const oldImage = existing.images?.[0];
    if (oldImage) {
      await deleteFile(oldImage, 'events');
    }

    const filename = await uploadFile(file, 'events');
    updateImage = [filename];
  }

  const data = {
    name,
    description,
    status,
    location,
    price: price !== undefined ? BigInt(price) : undefined,
    images: req.file ? updateImage : undefined,
    quota: quota !== undefined ? parseInt(quota) : undefined,
  };

  // filter out undefined values
  Object.keys(data).forEach(
    (key) => data[key] === undefined && delete data[key]
  );

  const result = await prisma.event.update({
    where: {
      id: Number(id),
    },
    data,
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      location: true,
      price: true,
      images: true,
      quota: true,
    },
  });

  const formattedResult = {
    ...result,
    price: Number(result.price),
    quota: Number(result.quota),
  };

  return formattedResult;
};

const deleteEvent = async (req) => {
  const { id } = req.params;

  const existing = await prisma.event.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      images: true,
    },
  });

  if (!existing) {
    throw new NotFoundError(`Event with id ${id} not found`);
  }

  await deleteFile(existing.images[0], 'events');

  await prisma.event.delete({
    where: {
      id: Number(id),
    },
  });

  return { msg: `Event with Id ${id} deleted successfully` };
};

const checkingEvents = async (id) => {
  const result = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!result) {
    throw new NotFoundError(`Event with id ${id} not found`);
  }

  return result;
};

module.exports = {
  createEvents,
  getAllEvents,
  getOneEvent,
  updateEvent,
  deleteEvent,
  checkingEvents,
};
