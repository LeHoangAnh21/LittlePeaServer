const Recruitment = require('../model/recruitment')

class RecruitmentController {

	//Hiển thị Recruitment
	index(req, res, next) {
		Recruitment.find({})
			.then(recruitments => res.status(200).json(recruitments))
			//catch trả về một function, 
			//vì vậy khi nó trả về và có thể tự gọi next
			.catch(next)
	}

	async search(req, res, next) {

		let data = await Recruitment.find({
			"$or": [
				{ title: { $regex: req.params.key } }
			]
		})

		res.json(data)

	}

	//Tạo Recruitment
	async create(req, res, next) {

		try {

			const newRecruitment = new Recruitment({
				title: req.body.title,
				company: req.body.company,
				avatarCompany: req.body.avatarCompany,
				jobDescription: req.body.jobDescription,
				requirementsCandidates: req.body.requirementsCandidates,
				benefitsCandidates: req.body.benefitsCandidates,
				salary: req.body.salary,
				numberRecruiting: req.body.numberRecruiting,
				experience: req.body.experience,
				deadline: req.body.deadline,
				image: req.body.image,
				location: req.body.location,
				category: req.body.category,
				status: req.body.status,
				user: req.userId
			})

			await newRecruitment.save()

			res.json({ success: true, message: 'Post Successfully!', recruitment: newRecruitment })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Maybe you missed something. Please try again!' })
		}
	}

	//Update Recruitment
	async update(req, res, next) {
		const { 
			title, 
			company,
			avatarCompany,
			jobDescription,
			requirementsCandidates,
			benefitsCandidates,
			salary,
			numberRecruiting,
			experience,
			deadline, 
			location,
			category,
			status,
			image 
		} = req.body

		// Simple validation
		if (!title || !company || !jobDescription || !requirementsCandidates || !benefitsCandidates || !deadline || !location || !category)
			return res
				.status(400)
				.json({ success: false, message: 'Require' })

		try {
			let updatedRecruitment = {
				title,
				company,
				avatarCompany,
				jobDescription,
				requirementsCandidates,
				benefitsCandidates,
				salary,
				numberRecruiting,
				experience,
				deadline,
				location,
				category,
				status,
				image
			}

			const recruitmentUpdateCondition = { _id: req.params.id }

			updatedRecruitment = await Recruitment.findOneAndUpdate(
				recruitmentUpdateCondition,
				updatedRecruitment,
				{ new: true }
			)

			// User not authorised to update Recruitment or post not found
			if (!updatedRecruitment)
				return res.status(401).json({
					success: false,
					message: 'Recruitment not found or user not authorised'
				})

			res.json({
				success: true,
				message: 'Update Successfully',
				recruitment: updatedRecruitment
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Update has falsed' })
		}
	}

	async delete(req, res, next) {
		try {
			const recruitmentDeleteCondition = { _id: req.params.id, user: req.userId }
			
			const deletedRecruitment = await Recruitment.findOneAndDelete(recruitmentDeleteCondition)

			// User not authorised or Recruitment not found
			if (!deletedRecruitment)
				return res.status(401).json({
					success: false,
					message: 'Recruitment not found or user not authorised'
				})

			res.json({ success: true, recruitment: deletedRecruitment })
		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false, message: 'Internal server error' })
		}
	}

}

module.exports = new RecruitmentController;
