var express = require('express');
var router = express.Router();
var verify = require('../middleware/index')

const siteController = require('../app/controllers/SiteController')

router.use('/login', siteController.login)

router.use('/register', siteController.register)

router.use('/', verify.verifyToken, siteController.verify)

module.exports = router
