const express = require('express');
const router = express();
const { create, loginCms, userLogged } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/auth/register', create);
router.post('/auth/login', loginCms);
router.get('/user/me', authenticateUser, userLogged);

module.exports = router;
