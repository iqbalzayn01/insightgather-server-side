const express = require('express');
const router = express();
const { create, index, find, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-orders',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  create
);
router.get('/orders', authenticateUser, authorizeRoles('superadmin'), index);
router.get('/orders/:id', authenticateUser, authorizeRoles('superadmin'), find);
router.delete(
  '/orders/:id',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  destroy
);

module.exports = router;
