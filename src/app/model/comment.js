const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user')
const Blog = require('./blog')

const Comment = new Schema({
	content: {
		type: String,
		required: true,
	},
	blog: {
		type: Schema.Types.ObjectId,
		ref: Blog,
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

module.exports = mongoose.model('Comment', Comment);
