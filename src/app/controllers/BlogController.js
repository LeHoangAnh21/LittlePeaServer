const Blog = require('../model/blog')
const Category = require('../model/category')
const util = require('./util');

class BlogController {

	//Hiển thị blog 
	index(req, res, next) {
		Blog.find({})
			.then(blogs => res.status(200).json(blogs))
			.catch(next)
	}

	async search(req, res, next) {

		let data = await Blog.find({
			"$or": [
				{ title: { $regex: req.params.key } }
			]
		})

		res.json(data)

	}

	//Tạo blog
	async create(req, res, next) {

		try {

			const newBlog = new Blog({
				title: req.body.title,
				content: req.body.content,
				image: req.body.image,
				category: req.body.category,
				status: req.body.status,
				user: req.userId
			})

			const category = await Category.findOne(
				{ _id: req.body.category },
				"Blog"
			)
			await Category.findByIdAndUpdate(req.body.category, {
				Blog: category.Blog + 1,
			})

			await newBlog.save()

			res.json({ success: true, message: 'Successfully', blog: newBlog })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'You missed something. Please try again!' })
		}
	}

	//Update blog
	async update(req, res, next) {
		const { title, content, image, status, category } = req.body

		// Simple validation
		if (!title)
			return res
				.status(400)
				.json({ success: false, message: 'Title is required' })

		try {
			let updatedBlog = {
				title,
				content: content || '',
				image,
				status,
				category,
			}

			const blogUpdateCondition = { _id: req.params.id }

			updatedBlog = await Blog.findOneAndUpdate(
				blogUpdateCondition,
				updatedBlog,
				{ new: true }
			)

			// User not authorised to update Blog or post not found
			if (!updatedBlog)
				return res.status(401).json({
					success: false,
					message: 'You missed something!'
				})

			res.json({
				success: true,
				message: 'Successfully',
				blog: updatedBlog
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Update has failed. Maybe you missed something.' })
		}
	}

	async delete(req, res, next) {
		try {
			const blogDeleteCondition = { _id: req.params.id, user: req.userId }
			const deletedBlog = await Blog.findOneAndDelete(blogDeleteCondition)

			// User not authorised or Blog not found
			if (!deletedBlog)
				return res.status(401).json({
					success: false,
					message: 'Blog not found or user not authorised'
				})

			res.json({ success: true, blog: deletedBlog })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Delete successfully' })
		}
	}

	async like(req, res, next) {

		const blogId = req.params.id
		const blog = await Blog.findOne(
			{ _id: blogId },
			"like likeCount"
		)

		const isLike = blog.like.includes(req.id)
		const option = "$push"
		const likeCount = blog.likeCount + 1

		await Blog.findByIdAndUpdate(blogId, {
			[option]: { like: req.userId },
			likeCount: likeCount
		})

		res.status(200).json("Like Successful")
	}

	async unLike(req, res, next) {

		const blogId = req.params.id
		const blog = await Blog.findOne(
			{ _id: blogId },
			"like likeCount"
		)

		const isLike = blog.like.includes(req.id)
		const option = "$pull"
		const likeCount = blog.likeCount - 1

		await Blog.findByIdAndUpdate(blogId, {
			[option]: { like: req.userId },
			likeCount: likeCount
		})

		res.status(200).json("Like Successful")
	}

}

module.exports = new BlogController;
