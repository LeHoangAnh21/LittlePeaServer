const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Category = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	Course: { 
		type: Number, 
		default: 0 
	},
	Blog: {
		type: Number,
		default: 0
	},
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Category', Category);
