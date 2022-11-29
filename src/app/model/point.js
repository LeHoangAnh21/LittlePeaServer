const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Course = require('./course');
const User = require('./user');

const Point = new Schema({
	point: {
		type: String,
		required: true,
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: Course,
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

module.exports = mongoose.model('Point', Point);
