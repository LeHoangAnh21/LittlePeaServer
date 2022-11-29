const mongoose = require('mongoose');
const Category = require('./category');
const slug = require('mongoose-slug-generator');
const User = require('./user');
const Schema = mongoose.Schema


const Course = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: Category,
	},
	Lesson: {
		type: Number,
		default: 0
	},
	Test: {
		type: Number,
		default: 0
	},
	slug: { 
		type: String, 
		slug: 'name', 
		unique: true 
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

mongoose.plugin(slug);

module.exports = mongoose.model('Course', Course);
