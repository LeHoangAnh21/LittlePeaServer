const Category = require('../model/category')

class CategoryController {

	//Hiển thị Category 
	index(req, res, next) {
		Category.find({})
			.then(categories => res.status(200).json(categories))
			
			//catch trả về một function, 
			//vì vậy khi nó trả về và có thể tự gọi next
			.catch(next)
	}

	//Tạo Category
	async create(req, res, next) {

		
		try {

			const newCategory = new Category({
				title: req.body.title,
				description: req.body.description,
			})

			await newCategory.save()

			res.json({ success: true, message: 'Successfully', category: newCategory })

		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	//Update Category
	async update(req, res, next) {
		const { title, description, } = req.body

		// Simple validation
		if (!title)
			return res
				.status(400)
				.json({ success: false, message: 'Title is required' })

		try {
			let updatedCategory = {
				title,
				description: description || '',
			}

			//Thêm "user: req.userId" khi hoàn thanhf bảng user
			const categoryUpdateCondition = { _id: req.params.id }

			updatedCategory = await Category.findOneAndUpdate(
				categoryUpdateCondition,
				updatedCategory,
				{ new: true }
			)

			// User not authorised to update Category or post not found
			if (!updatedCategory)
				return res.status(401).json({
					success: false,
					message: 'Category not found or user not authorised'
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				category: updatedCategory
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	async delete(req, res, next) {
		try {
			//Thêm "user: req.userId" khi hoàn thanhf bảng user
			const categoryDeleteCondition = { _id: req.params.id }
			const deletedCategory = await Category.findOneAndDelete(categoryDeleteCondition)

			// User not authorised or Category not found
			if (!deletedCategory)
				return res.status(401).json({
					success: false,
					message: 'Category not found or user not authorised'
				})

			res.json({ success: true, category: deletedCategory })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new CategoryController;
