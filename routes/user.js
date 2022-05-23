const express = require('express');
const handleErrorAsync = require('../service/handleErrorAsync')
const isAuth = require('../middleware/isAuth')

const router = express.Router();
const user = require('../controllers/user')


router.get('/', handleErrorAsync((req, res, next) => user.get(req, res, next)));
router.post('/sign_up', handleErrorAsync((req, res, next) => user.sign_up(req, res, next)))
router.post('/sign_in', handleErrorAsync((req, res, next) => user.sign_in(req, res, next)))
router.post('/updatePassword', isAuth, handleErrorAsync((req, res, next) => user.updatePassword(req, res, next)))
router.get('/profile', isAuth, handleErrorAsync((req, res, next) => user.profile(req, res, next)));
module.exports = router;
