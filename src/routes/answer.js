const express = require('express');
const router = express.Router();

const answerController = require('../app/controllers/AnswerController')

router.post('/create', answerController.create)

router.put('/:id', answerController.update);

router.delete('/:id', answerController.delete);

router.get('/', answerController.index)

module.exports = router
