const coursesRouter = require('./courses')
const categoriesRouter = require('./categories')
const lessonRouter = require('./lesson')
const blogRouter = require('./blog')
const recruitmentRouter = require('./recruitment')
const applicationRouter = require('./application')
const userRouter = require('./user')
const siteRouter = require('./site')
const testRouter = require('./test')
const questionRouter = require('./question')
const answerRouter = require('./answer')
const commentRouter = require('./comment')
const subcommentRouter = require('./subComment')
const pointRouter = require('./point')

function route(app){

	app.use('/point', pointRouter)

	app.use('/sub-comment', subcommentRouter)

	app.use('/comment', commentRouter)

	app.use('/answer', answerRouter)

	app.use('/question', questionRouter)

	app.use('/test', testRouter)

	app.use('/application', applicationRouter)

	app.use('/lesson', lessonRouter)
	
	app.use('/categories', categoriesRouter)
	
	app.use('/courses', coursesRouter)

	app.use('/recruitment', recruitmentRouter)
	
	app.use('/blog', blogRouter)

	app.use('/user', userRouter)

	app.use('/', siteRouter)
}

module.exports = route
