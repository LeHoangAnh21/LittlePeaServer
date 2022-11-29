const Course = require('../model/course')
const Category = require('../model/category')

class CoursesController {
	
	//Hiển thị khóa học 
	index(req, res, next){
		Course.find({})
			.then(courses => res.status(200).json(courses))
			//catch trả về một function, 
			//vì vậy khi nó trả về và có thể tự gọi next
			.catch(next)
	}

	async search(req, res, next) {

		let data = await Course.find({
			"$or": [
				{ name: { $regex: req.params.key } }
			]
		})

		res.json(data)

	}

	//Tạo khóa học
	async create(req, res, next){

		try {
			
			const newCourse = new Course({
				name: req.body.name,
				description: req.body.description,
				image: req.body.image,
				category: req.body.category,
				status: req.body.status,
				user: req.userId
			})

			const category = await Category.findOne(
				{ _id: req.body.category },
				"Course"
			)
			await Category.findByIdAndUpdate(req.body.category, {
				Course: category.Course + 1,
			})

			await newCourse.save()
			res.json({ success: true, message: 'Happy learning!', course: newCourse })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Maybe you missed something. Please try again!' })
		}
	} 

	//Update khóa học
	async update(req, res, next){
		const { name, description, image, category, status } = req.body

		// Simple validation
		if (!name)
			return res
				.status(400)
				.json({ success: false, message: 'Title is required' })

		try {
			let updatedCourse = {
				name,
				description: description || '',
				image,
				category,
				status
			}

			const courseUpdateCondition = { _id: req.params.id }

			updatedCourse = await Course.findOneAndUpdate(
				courseUpdateCondition,
				updatedCourse,
				{ new: true }
			)

			// User not authorised to update Course or post not found
			if (!updatedCourse)
				return res.status(401).json({
					success: false,
					message: 'Course not found or user not authorised'
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				course: updatedCourse
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Update has failed' })
		}
	}

	async delete(req, res, next){
		try {
			const courseDeleteCondition = { _id: req.params.id, user: req.userId }
			const deletedCourse = await Course.findOneAndDelete(courseDeleteCondition)

			// User not authorised or Course not found
			if (!deletedCourse)
				return res.status(401).json({
					success: false,
					message: 'Course not found or user not authorised'
				})

			res.json({ success: true, course: deletedCourse })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new CoursesController;
