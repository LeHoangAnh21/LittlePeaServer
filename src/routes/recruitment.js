const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const recruitmentController = require('../app/controllers/RecruitmentController')

router.post('/create', verify.verifyToken,  recruitmentController.create)

router.put('/:id', recruitmentController.update);

router.delete('/:id', verify.verifyToken, recruitmentController.delete);

router.post('/search/:key', recruitmentController.search)

router.get('/', verify.verifyToken, recruitmentController.index)

module.exports = router
