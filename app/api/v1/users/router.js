const express = require('express');
const router = express();
const { index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/users', authenticateUser, authorizeRoles('superadmin'), index);
router.get(
  '/users/:id',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  find
);
router.put(
  '/users/:id',
  authenticateUser,
  authorizeRoles('superadmin', 'participant'),
  update
);
router.delete(
  '/users/:id',
  authenticateUser,
  authorizeRoles('superadmin'),
  destroy
);

module.exports = router;
