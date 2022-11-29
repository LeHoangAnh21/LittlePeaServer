const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const categoriesController = require('../app/controllers/CategoryController')

router.post('/create', verify.verifyToken, categoriesController.create)

router.put('/:id', verify.verifyToken, categoriesController.update);

router.delete('/:id', verify.verifyToken, categoriesController.delete);

router.get('/', verify.verifyToken, categoriesController.index)

module.exports = router
