const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Recruitment = require('./recruitment');
const User = require('./user');

const Application = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageCV: {
		type: String,
		required: true,
	},
	recruitment: {
		type: Schema.Types.ObjectId,
		ref: Recruitment,
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

module.exports = mongoose.model('Application', Application);
