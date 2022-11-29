const Question = require('../model/question')
const Test = require('../model/test')

class QuestionController {

	index(req, res, next) {
		Question.find({})
			.then(questions => 
				res.status(200).json(questions)
			)
			//catch trả về một function, 
			//vì vậy khi nó trả về và có thể tự gọi next
			.catch(next)

	}

	
	async create(req, res, next) {

		try {
			const newQuestion = new Question({
				title: req.body.title,
				test: req.body.test,
			})

			const test = await Test.findOne(
				{ _id: req.body.test },
				"Question"
			)
			await Test.findByIdAndUpdate(req.body.test, {
				Question: test.Question + 1,
			})

			await newQuestion.save()

			res.json({ success: true, messageQuestion: 'Successfully!', question: newQuestion })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageQuestion: 'Maybe you missed something. Please try again!' })
		}
	}

	
	async update(req, res, next) {
		const { title, test } = req.body

		if (!title)
			return res
				.status(400)
				.json({ success: false, messageQuestion: 'Title is required' })

		try {
			let updatedQuestion = {
				title,
				test,
			}

			const questionUpdateCondition = { _id: req.params.id }

			updatedQuestion = await Question.findOneAndUpdate(
				questionUpdateCondition,
				updatedQuestion,
				{ new: true }
			)

			if (!updatedQuestion)
				return res.status(401).json({
					success: false,
					messageQuestion: 'Question not found or user not authorised'
				})

			res.json({
				success: true,
				messageQuestion: 'Excellent progress!',
				question: updatedQuestion
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageQuestion: 'Update has failed!'})
		}
	}

	async delete(req, res, next) {
		try {
			const questionDeleteCondition = { _id: req.params.id }

			const id = req.params.id

			const question = await Question
				.findOne({ _id: id })
				.populate("test")

			await Test.findByIdAndUpdate(question.test.id, {
				Question: question.test.Question - 1,
			})

			const deletedQuestion = await Question.findOneAndDelete(questionDeleteCondition)

			if (!deletedQuestion)
				return res.status(401).json({
					success: false,
					messageQuestion: 'Question not found or user not authorised'
				})

			res.json({ success: true, question: deletedQuestion })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageQuestion: 'Internal server error' })
		}
	}

}

module.exports = new QuestionController;
