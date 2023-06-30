const express = require('express');
const multer = require('multer');

const aboutizmirtffController = require('../../controllers/admin/aboutizmirtff');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", checkAuth, aboutizmirtffController.getAboutContent);

router.put("", checkAuth, extractImage, aboutizmirtffController.updateAboutContent);

module.exports = router;
