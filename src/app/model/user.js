const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	workplace: {
		type: String
	},
	email: {
		type: String,
	},
	activation: {
		type: String
	},
	time: {
		type: Date
	},
	avatar: {
		type: String,
	},
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', User);
