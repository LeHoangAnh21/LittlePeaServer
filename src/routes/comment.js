const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const commentController = require('../app/controllers/CommentController')

router.post('/create', verify.verifyToken, commentController.create)

router.put('/:id', verify.verifyToken, commentController.update);

router.delete('/:id', verify.verifyToken, commentController.delete);

router.get('/', verify.verifyToken, commentController.index)

module.exports = router
