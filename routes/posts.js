const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts')
const handleErrorAsync = require('../service/handleErrorAsync')

// middleware
const checkKeyword = require('../middleware/post/checkKeyword')

router.get('/search', checkKeyword, handleErrorAsync((req, res, next) => posts.search(req, res, next)));
router.get('/', handleErrorAsync((req, res, next) => posts.getData(req, res, next)));
router.post('/', handleErrorAsync((req, res, next) => posts.createPost(req, res, next)))
router.patch('/:id', handleErrorAsync((req, res, next) => posts.updatePost(req, res, next)))
router.patch('/:id/like', handleErrorAsync((req, res, next) => posts.likePost(req, res, next)))
router.delete('/:id', handleErrorAsync((req, res, next) => posts.deletePost(req, res, next)))

module.exports = router;
