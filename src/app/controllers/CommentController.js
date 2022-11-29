const Comment = require('../model/comment')
const Blog = require('../model/blog')

class CommentController {
	
	index(req, res, next){
		Comment.find({})
			.then(Comments => res.status(200).json(Comments))
			.catch(next)
	}

	async create(req, res, next){

		try {
			
			const newComment = new Comment({
				content: req.body.content,
				blog: req.body.blog,
				user: req.userId
			})

			// const category = await Category.findOne(
			// 	{ _id: req.body.category },
			// 	"Comment"
			// )
			// await Category.findByIdAndUpdate(req.body.category, {
			// 	Comment: category.Comment + 1,
			// })

			await newComment.save()
			res.json({ success: true, message: 'Done', comment: newComment })

		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	} 

	async update(req, res, next){
		const { content, blog } = req.body

		try {
			let updatedComment = {
				content,
				blog
			}

			const commentUpdateCondition = { _id: req.params.id, user: req.userId }

			updatedComment = await Comment.findOneAndUpdate(
				commentUpdateCondition,
				updatedComment,
				{ new: true }
			)

			// User not authorised to update Comment or post not found
			if (!updatedComment)
				return res.status(401).json({
					success: false,
					message: 'Comment not found or user not authorised'
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				comment: updatedComment
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	async delete(req, res, next){
		try {
			const commentDeleteCondition = { _id: req.params.id, user: req.userId }
			const deletedComment = await Comment.findOneAndDelete(commentDeleteCondition)

			// User not authorised or Comment not found
			if (!deletedComment)
				return res.status(401).json({
					success: false,
					message: 'Comment not found or user not authorised'
				})

			res.json({ success: true, comment: deletedComment })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new CommentController;
