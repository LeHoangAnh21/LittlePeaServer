const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Category = require('./category');
const User = require('./user');

const Blog = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	like: [{ 
		type: Schema.Types.ObjectId,
		ref: User, 
	}],
	likeCount: {
		type: Number,
		default: 0,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: Category,
	},
	status: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: User,
	},
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Blog', Blog);
