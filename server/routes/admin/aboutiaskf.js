const express = require('express');
const multer = require('multer');

const aboutiaskfController = require('../../controllers/admin/aboutiaskf');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, aboutiaskfController.getAboutContent);

router.put("", checkAuth, aboutiaskfController.updateAboutContent);

module.exports = router;
