const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Test = require('./test');

const Question = new Schema({
	title: {
		type: String,
		required: true,
	},
	test: {
		type: Schema.Types.ObjectId,
		ref: Test,
	}
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Question', Question);
