const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController')

router.put('/:id', siteController.update);

router.delete('/:id', siteController.delete);

router.get('/', siteController.getUser);

module.exports = router
