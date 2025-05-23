const express = require('express');
const router = express();
const { create, index } = require('./controller');
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
router.get(
  '/order-items',
  authenticateUser,
  authorizeRoles('superadmin'),
  index
);

module.exports = router;
