const express = require('express');
const router = express();
const upload = require('../../../middlewares/multer');
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-events',
  upload.single('images'),
  authenticateUser,
  authorizeRoles('superadmin'),
  create
);
router.get('/events', authenticateUser, authorizeRoles('superadmin'), index);
router.get('/events/:id', authenticateUser, authorizeRoles('superadmin'), find);
router.put(
  '/events/:id',
  authenticateUser,
  authorizeRoles('superadmin'),
  update
);
router.delete(
  '/events/:id',
  authenticateUser,
  authorizeRoles('superadmin'),
  destroy
);

module.exports = router;
