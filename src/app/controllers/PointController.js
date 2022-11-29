const Point = require('../model/point')

class PointController {

	index(req, res, next) {
		Point.find({})
			.then(points => res.status(200).json(points))
			.catch(next)
	}

	async save(req, res, next) {

		try {

			const newPoint = new Point({
				point: req.body.point,
				course: req.body.course,
				user: req.userId
			})

			await newPoint.save()

			res.json({ success: true, message: 'Save Successfully!', point: newPoint })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new PointController;
