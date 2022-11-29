const express = require('express');
const router = express.Router();
var verify = require('../middleware/index')

const pointController = require('../app/controllers/PointController')

router.post('/create', verify.verifyToken, pointController.save)

router.get('/', verify.verifyToken, pointController.index);

module.exports = router
