const express = require('express');

const aboutizmirtffController = require('../../controllers/admin/aboutizmirtff');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("", checkAuth, aboutizmirtffController.getAboutContent);

router.put("", checkAuth, extractImage, setTimestamp, aboutizmirtffController.updateAboutContent);

module.exports = router;
