const Application = require('../model/application')
const Recruitment = require('../model/recruitment')

class ApplicationController {

	//Hiển thị Application
	index(req, res, next) {
		Application.find({})
			.then(applications => res.status(200).json(applications))
			//catch trả về một function, 
			//vì vậy khi nó trả về và có thể tự gọi next
			.catch(next)
	}

	//Tạo Application
	async create(req, res, next) {

		try {

			const newApplication = new Application({
				name: req.body.name,
				description: req.body.description,
				imageCV: req.body.imageCV,
				recruitment: req.body.recruitment,
				user: req.userId
			})

			const recruitment = await Recruitment.findOne(
				{ _id: req.body.recruitment },
				"Application"
			)
			await Recruitment.findByIdAndUpdate(req.body.recruitment, {
				Application: recruitment.Application + 1,
			})

			await newApplication.save()

			res.json({ success: true, message: 'Apply Successfully!', application: newApplication })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Maybe something went wrong. Please try again.' })
		}
	}

	async delete(req, res, next) {
		try {
			const applicationDeleteCondition = { _id: req.params.id }

			const id = req.params.id

			const application = await Application
				.findOne({ _id: id })
				.populate("recruitment")

			await Recruitment.findByIdAndUpdate(application.recruitment.id, {
				Application: application.recruitment.Application - 1,
			})

			const deletedApplication = await Application.findOneAndDelete(applicationDeleteCondition)

			// User not authorised or Application not found
			if (!deletedApplication)
				return res.status(401).json({
					success: false,
					message: 'Application not found or user not authorised'
				})

			res.json({ success: true, application: deletedApplication })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new ApplicationController;
