const Lesson = require('../model/lesson')
const Course = require('../model/course')

class LessonController {

	//Hiển thị bài học
	index(req, res, next) {
		Lesson.find({})
			.then(lessons => 
				res.status(200).json(lessons)
			)
			//catch trả về một function, 
			//vì vậy khi nó trả về và có thể tự gọi next
			.catch(next)

	}

	//Tạo bài học
	async create(req, res, next) {

		try {
			const newLesson = new Lesson({
				title: req.body.title,
				description: req.body.description,
				videoId: req.body.videoId,
				course: req.body.course,
			})

			const course = await Course.findOne(
				{ _id: req.body.course },
				"Lesson"
			)
			await Course.findByIdAndUpdate(req.body.course, {
				Lesson: course.Lesson + 1,
			})

			await newLesson.save()
			res.json({ success: true, message: 'Happy learning!', lesson: newLesson })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Maybe something went wrong. Please try again.' })
		}
	}

	//Update khóa học
	async update(req, res, next) {
		const { title, description, videoId, course } = req.body

		// Simple validation
		if (!title)
			return res
				.status(400)
				.json({ success: false, message: 'Title is required' })

		try {
			let updatedLesson = {
				title,
				description: description || '',
				videoId,
				course,
			}

			const lessonUpdateCondition = { _id: req.params.id }

			updatedLesson = await Lesson.findOneAndUpdate(
				lessonUpdateCondition,
				updatedLesson,
				{ new: true }
			)

			if (!updatedLesson)
				return res.status(401).json({
					success: false,
					message: 'Lesson not found or user not authorised'
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				lesson: updatedLesson
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Updated has failed!' })
		}
	}

	async delete(req, res, next) {
		try {
			const lessonDeleteCondition = { _id: req.params.id }

			const id = req.params.id

			const lesson = await Lesson
				.findOne({ _id: id })
				.populate("course")

			await Course.findByIdAndUpdate(lesson.course.id, {
				Lesson: lesson.course.Lesson - 1,
			})

			const deletedLesson = await Lesson.findOneAndDelete(lessonDeleteCondition)

			// User not authorised or Course not found
			if (!deletedLesson)
				return res.status(401).json({
					success: false,
					message: 'Lesson not found or user not authorised'
				})

			res.json({ success: true, lesson: deletedLesson })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new LessonController;
