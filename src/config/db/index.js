const mongoose = require('mongoose')

async function connect() {

	try {
		await mongoose.connect('mongodb://localhost:27017/LittlePeaData', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('Database connect successfully')
	}

	// try {
	// 	await mongoose.connect('mongodb+srv://arsper11:lehoanganh21@cluster0.bipvm.mongodb.net/LittlePeaDatabases', {
	// 		useNewUrlParser: true,
	// 		useUnifiedTopology: true
	// 	});
	// 	console.log('Database connect successfully')
	// }

	catch (error) {
		console.log('Connect failed')
	}

}

//mongodb+srv://arsper11:lehoanganh21@cluster0.bipvm.mongodb.net/LittlePeaDatabases

module.exports = { connect }