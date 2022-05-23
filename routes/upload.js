const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload')

const handleErrorAsync = require('../service/handleErrorAsync')

const beforeUpload = require('../middleware/beforeUpload') // 檢查大小格式等
const isAuth = require('../middleware/isAuth')

router.post('/uploadSingleImage', isAuth, beforeUpload, handleErrorAsync((req, res, next) => upload.uploadSingleImage(req, res, next)));

module.exports = router;
