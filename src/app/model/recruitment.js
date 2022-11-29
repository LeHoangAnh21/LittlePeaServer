const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./user');

const Recruitment = new Schema({
	title: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	avatarCompany: {
		type: String,
	},
	jobDescription: {
		type: String,
		required: true,
	},
	requirementsCandidates: {
		type: String,
		required: true,
	},
	benefitsCandidates: {
		type: String,
		required: true,
	},
	salary: {
		type: String,
		required: true,
	},
	numberRecruiting: {
		type: Number,
	},
	experience: {
		type: String,
	},
	deadline: {
		type: Date,
		required: true,
	},
	image: {
		type: String,
	},
	location: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	Application: {
		type: Number,
		default: 0
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

module.exports = mongoose.model('Recruitment', Recruitment);
