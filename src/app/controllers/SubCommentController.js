const subComment = require('../model/subComment')

class SubCommentController {
	
	index(req, res, next){
		subComment.find({})
			.then(subComments => res.status(200).json(subComments))
			.catch(next)
	}

	async create(req, res, next){

		try {
			
			const newSubComment = new subComment({
				content: req.body.content,
				commentId: req.body.commentId,
				user: req.userId
			})

			await newSubComment.save()
			res.json({ success: true, message: 'Done', subcomment: newSubComment })

		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	} 

	async update(req, res, next){
		const { content, commentId } = req.body

		try {
			let updatedSubComment = {
				content,
				commentId
			}

			const subCommentUpdateCondition = { _id: req.params.id, user: req.userId }

			updatedSubComment = await subComment.findOneAndUpdate(
				subCommentUpdateCondition,
				updatedSubComment,
				{ new: true }
			)

			// User not authorised to update Comment or post not found
			if (!updatedSubComment)
				return res.status(401).json({
					success: false,
					message: 'Comment not found or user not authorised'
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				subcomment: updatedSubComment
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	async delete(req, res, next){
		try {
			const subCommentDeleteCondition = { _id: req.params.id, user: req.userId }
			const deletedSubComment = await Comment.findOneAndDelete(subCommentDeleteCondition)

			// User not authorised or Comment not found
			if (!deletedSubComment)
				return res.status(401).json({
					success: false,
					message: 'Comment not found or user not authorised'
				})

			res.json({ success: true, subcomment: deletedSubComment })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new SubCommentController;
