const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const coursesController = require('../app/controllers/CoursesController')

router.post('/create', verify.verifyToken, coursesController.create)

router.put('/:id', coursesController.update);

router.delete('/:id', verify.verifyToken, coursesController.delete);

router.post('/search/:key', coursesController.search)

router.get('/', verify.verifyToken, coursesController.index)

module.exports = router
