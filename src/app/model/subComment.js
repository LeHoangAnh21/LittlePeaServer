const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user')
const Comment = require('./comment')

const subComment = new Schema({
	content: {
		type: String,
		required: true,
	},
	commentId: {
		type: Schema.Types.ObjectId,
		ref: Comment,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: User,
	}
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('subComment', subComment);
