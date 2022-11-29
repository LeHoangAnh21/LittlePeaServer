const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const applicationController = require('../app/controllers/ApplicationController')

router.post('/create', verify.verifyToken, applicationController.create)

router.delete('/:id', applicationController.delete);

router.get('/', verify.verifyToken, applicationController.index)

module.exports = router
