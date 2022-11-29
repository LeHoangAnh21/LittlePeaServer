const jwt = require('jsonwebtoken')

const tokenSecret = process.env.ACCESS_TOKEN_SECRET || ""

const verifyToken = async (req, res, next) => {

	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
		const decoded = jwt.verify(token, tokenSecret)

		req.userId = decoded.userId

		next()

	} catch (err) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
	}
}

const isAdmin = (req, res, next) => {
	if (req.role === "admin") {
		return next()
	}
	return res.status(401).json("Access denied")
}

// const isTeacher = (req, res, next) => {
// 	if (req.role == "teacher" || req.role == "admin") {
// 		return next()
// 	}
// 	return res.status(401).json("Unauthorization")
// }

// const isStudent = (req, res, next) => {
// 	if (req.role == "student" || req.role == "admin") {
// 		return next()
// 	}
// 	return res.status(401).json("Unauthorization")
// }

// const isRecruitment = (req, res, next) => {
// 	if (req.role == "recruitment" || req.role == "admin") {
// 		return next()
// 	}
// 	return res.status(401).json("Unauthorization")
// }

module.exports = { verifyToken, isAdmin }
