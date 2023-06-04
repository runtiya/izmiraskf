const express = require('express');
const multer = require('multer');

const disciplinaryBoardFileController = require('../../controllers/application/disciplinaryboardfiles');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:seasonid", disciplinaryBoardFileController.getDisciplinaryBoardFiles);

module.exports = router;
