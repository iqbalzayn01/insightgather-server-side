const express = require('express');
const router = express();
const { checkout, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/checkout',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  checkout
);

router.delete(
  '/checkout/:id',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  destroy
);

module.exports = router;
