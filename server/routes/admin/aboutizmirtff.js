const express = require('express');
const multer = require('multer');

const aboutizmirtffController = require('../../controllers/admin/aboutizmirtff');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, aboutizmirtffController.getAboutContent);

router.put("", checkAuth, aboutizmirtffController.updateAboutContent);

module.exports = router;
