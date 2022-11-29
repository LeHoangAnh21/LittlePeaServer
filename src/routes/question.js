const express = require('express');
const router = express.Router();

const questionController = require('../app/controllers/QuestionController')

router.post('/create', questionController.create)

router.put('/:id', questionController.update);

router.delete('/:id', questionController.delete);

router.get('/', questionController.index)

module.exports = router
