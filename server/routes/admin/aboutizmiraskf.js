const express = require('express');
const multer = require('multer');

const aboutizmiraskfController = require('../../controllers/admin/aboutizmiraskf');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, aboutizmiraskfController.getAboutContent);

router.put("", checkAuth, aboutizmiraskfController.updateAboutContent);

module.exports = router;
