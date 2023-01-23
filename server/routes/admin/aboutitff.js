const express = require('express');
const multer = require('multer');

const aboutitffController = require('../../controllers/admin/aboutitff');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("", aboutitffController.getAboutContent);

router.put("", aboutitffController.updateAboutContent);

module.exports = router;
