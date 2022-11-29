const Course = require('../model/course')
const Test = require('../model/test')

class TestController {

	//Hiển thị Test
	index(req, res, next) {
		Test.find({})
			.then(tests => res.status(200).json(tests))
			.catch(next)
	}

	//Tạo Test
	async create(req, res, next) {

		try {

			const newTest = new Test({
				title: req.body.title,
				description: req.body.description,
				course: req.body.course,
			})

			const course = await Course.findOne(
				{ _id: req.body.course },
				"Test"
			)

			if (course.Test === 0){
				await Course.findByIdAndUpdate(req.body.course, {
					Test: course.Test + 1,
				})
	
				await newTest.save()
	
				res.json({ success: true, messageToastTest: 'Add Test Successfully!', test: newTest })
			}else{
				res.status(500).json({ success: false, messageToastTest: 'You posted a test before. You can only post one test.' })
			}

		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageToastTest: 'Maybe you missed something. Please try again!' })
		}
	}

	//Update Test
	async update(req, res, next) {
		const { title, description, course } = req.body

		// Simple validation
		if (!title)
			return res
				.status(400)
				.json({ success: false, messageToastTest: 'Title is required' })

		try {
			let updatedTest = {
				title,
				description: description || '',
				course,
			}

			//Thêm "user: req.userId" khi hoàn thanhf bảng user
			const testUpdateCondition = { _id: req.params.id }

			updatedTest = await Test.findOneAndUpdate(
				testUpdateCondition,
				updatedTest,
				{ new: true }
			)

			// User not authorised to update Test or post not found
			if (!updatedTest)
				return res.status(401).json({
					success: false,
					messageToastTest: 'Test not found or user not authorised'
				})

			res.json({
				success: true,
				messageToastTest: 'Excellent progress!',
				test: updatedTest
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageToastTest: 'Update has failed!' })
		}
	}

	async delete(req, res, next) {
		try {
			//Thêm "user: req.userId" khi hoàn thanhf bảng user
			const testDeleteCondition = { _id: req.params.id }

			const id = req.params.id

			const test = await Test
				.findOne({ _id: id })
				.populate("course")

			await Course.findByIdAndUpdate(test.course.id, {
				Test: test.course.Test - 1,
			})

			const deletedTest = await Test.findOneAndDelete(testDeleteCondition)

			// User not authorised or Test not found
			if (!deletedTest)
				return res.status(401).json({
					success: false,
					messageToastTest: 'Test not found or user not authorised'
				})

			res.json({ success: true, test: deletedTest })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, messageToastTest: 'Internal server error' })
		}
	}

}

module.exports = new TestController;
