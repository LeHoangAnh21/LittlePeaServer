const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Question = require('./question');

const Answer = new Schema({
	title: {
		type: String,
		required: true,
	},
	isTrue: {
		type: String,
		required: true,
	},
	questionId: {
		type: Schema.Types.ObjectId,
		ref: Question,
	},
},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Answer', Answer);
