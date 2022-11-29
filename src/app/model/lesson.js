const mongoose = require('mongoose');
const Course = require('./course');
const Schema = mongoose.Schema


const Lesson = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	videoId: {
		type: String,
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: Course,
	}
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Lesson', Lesson);
