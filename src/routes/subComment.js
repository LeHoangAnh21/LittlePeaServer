const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const subCommentController = require('../app/controllers/SubCommentController')

router.post('/create', verify.verifyToken, subCommentController.create)

router.put('/:id', verify.verifyToken, subCommentController.update);

router.delete('/:id', verify.verifyToken, subCommentController.delete);

router.get('/', verify.verifyToken, subCommentController.index)

module.exports = router
