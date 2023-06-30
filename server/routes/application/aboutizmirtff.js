const express = require('express');
const multer = require('multer');

const aboutizmirtffController = require('../../controllers/application/aboutizmirtff');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", aboutizmirtffController.getAboutContent);

module.exports = router;
