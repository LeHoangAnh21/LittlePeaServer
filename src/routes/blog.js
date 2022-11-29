const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const blogController = require('../app/controllers/BlogController')

router.post('/create', verify.verifyToken, blogController.create)

router.put('/:id/like', verify.verifyToken, blogController.like);

router.put('/:id/unlike', verify.verifyToken, blogController.unLike);

router.put('/:id', blogController.update);

router.delete('/:id', verify.verifyToken, blogController.delete);

router.post('/search/:key', blogController.search)

router.get('/', blogController.index)

module.exports = router
