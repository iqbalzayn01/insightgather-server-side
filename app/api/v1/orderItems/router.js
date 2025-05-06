const express = require('express');
const router = express();
const { create } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post(
  '/create-order-items',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  create
);

module.exports = router;
