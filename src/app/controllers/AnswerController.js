const Question = require('../model/question')
const Answer = require('../model/answer')

class AnswerController {

	//Hiển thị Answer
	index(req, res, next) {1
		Answer.find({})
			.then(answers => res.status(200).json(answers))
			.catch(next)
	}

	//Tạo Answer
	async create(req, res, next) {

		try {

			const newAnswer = new Answer({
				title: req.body.title,
				isTrue: req.body.isTrue,
				questionId: req.body.questionId,
			})

			await newAnswer.save()

			res.json({ success: true, messageAnswer: 'Successfully!', answer: newAnswer })
		
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageAnswer: 'Maybe you missed something. Please try again!' })
		}
	}

	//Update Answer
	async update(req, res, next) {
		const { title, isTrue, questionId } = req.body

		// Simple validation
		if (!title || !isTrue)
			return res
				.status(400)
				.json({ success: false, messageAnswer: 'Everything is required' })

		try {
			let updatedAnswer = {
				title,
				isTrue,
				questionId,
			}

			const answerUpdateCondition = { _id: req.params.id }

			updatedAnswer = await Answer.findOneAndUpdate(
				answerUpdateCondition,
				updatedAnswer,
				{ new: true }
			)

			if (!updatedAnswer)
				return res.status(401).json({
					success: false,
					messageAnswer: 'Answer not found or user not authorised'
				})

			res.json({
				success: true,
				messageAnswer: 'Excellent progress!',
				answer: updatedAnswer
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageAnswer: 'Update has failed!' })
		}
	}

	async delete(req, res, next) {
		try {
			const answerDeleteCondition = { _id: req.params.id }
			const deletedAnswer = await Answer.findOneAndDelete(answerDeleteCondition)

			if (!deletedAnswer)
				return res.status(401).json({
					success: false,
					messageAnswer: 'Answer not found or user not authorised'
				})

			res.json({ success: true, answer: deletedAnswer })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageAnswer: 'Internal server error' })
		}
	}

}

module.exports = new AnswerController;
