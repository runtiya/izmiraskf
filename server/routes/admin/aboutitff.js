const express = require('express');
const multer = require('multer');

const aboutitffController = require('../../controllers/admin/aboutitff');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, aboutitffController.getAboutContent);

router.put("", checkAuth, aboutitffController.updateAboutContent);

module.exports = router;
