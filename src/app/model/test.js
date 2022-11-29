const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Course = require('./course');

const Test = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: Course,
	},
	Question: {	
		type: Number,
		default: 0
	},
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Test', Test);
