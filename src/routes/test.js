const express = require('express');
const router = express.Router();

const testController = require('../app/controllers/TestController')

router.post('/create', testController.create)

router.put('/:id', testController.update);

router.delete('/:id', testController.delete);

router.get('/', testController.index)

module.exports = router
