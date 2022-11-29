const User = require('../model/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class SiteController {

	getUser(req, res, next) {
		User.find({})
			.then(users => res.status(200).json(users))
			.catch(next)
	}

	async delete(req, res, next) {
		try {
			const userDeleteCondition = { _id: req.params.id }
			const deletedUser = await User.findOneAndDelete(userDeleteCondition)

			// User not authorised or Test not found
			if (!deletedUser)
				return res.status(401).json({
					success: false,
					message: 'User not found or user not authorised'
				})

			res.json({ success: true, user: deletedUser })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	//Update User
	async update(req, res, next) {
		const { username, password, fullname, role, workplace, email, activation, time, avatar } = req.body

		try {
			let updatedUser = {
				username,
				password,
				fullname,
				role,
				workplace,
				email,
				activation,
				time,
				avatar,
			}

			const userUpdateCondition = { _id: req.params.id }

			updatedUser = await User.findOneAndUpdate(
				userUpdateCondition,
				updatedUser,
				{ new: true }
			)

			if (!updatedUser)
				return res.status(401).json({
					success: false,
					message: 'Failed'
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				user: updatedUser
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Update has failed!' })
		}
	}

	async verify(req, res){
		try {
			const user = await User.findById(req.userId).select('-password')
			if (!user)
				return res.status(400).json({ success: false, message: 'User not found' })
			res.json({ success: true, user })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	async register(req, res, next) {
		const { username, password, fullname, role, workplace, email, activation, time, avatar } = req.body

		// Simple validation
		if (!username || !password || !fullname || !role)
			return res
				.status(400)
				.json({ success: false, message: 'Maybe you are missing something. Please try again!' })

		try {
			// Check for existing user
			const user = await User.findOne({ username })

			if (user)
				return res
					.status(400)
					.json({ success: false, message: 'Username already taken.  Please try again!' })

			const hashedPassword = await argon2.hash(password)
			const newUser = new User({
				username,
				password: hashedPassword,
				fullname,
				role,
				workplace, 
				email,
				activation,
				time,
				avatar,
			})

			await newUser.save()

			// Return token
			const accessToken = jwt.sign(
				{ userId: newUser._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.json({
				success: true,
				message: 'Welcome to Little Pea, My Friend!',
				accessToken
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

	async login(req, res, next) {
		console.log("DMMMMM");
		const { username, password } = req.body

		if (!username || !password)
			return res
				.status(400)
				.json({ success: false, message: 'Maybe you missing something. Please try again!' })

		try {
			// Check for existing user
			const user = await User.findOne({ username })
			if (!user)
				return res
					.status(400)
					.json({ success: false, message: 'Incorrect username or Incorrect password' })


			const passwordValid = await argon2.verify(user.password, password)
			if (!passwordValid)
				return res
					.status(400)
					.json({ success: false, message: 'Incorrect username or Incorrect password' })

			// Return token
			const accessToken = jwt.sign(
				{ userId: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.json({
				success: true,
				message: 'Welcome back, My Friend!',
				accessToken
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}
}

module.exports = new SiteController;
