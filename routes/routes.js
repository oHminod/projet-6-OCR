const express = require('express');
const router = express.Router();

// const test = require('../controllers/test');
const user = require('../controllers/user');

// router.get('/', test.getTest);
// router.get('/uneroute/longue', test.getTest);
router.post('/api/auth/signup', user.userSignUp);
router.post('/api/auth/login', user.userLogIn);

module.exports = router;
