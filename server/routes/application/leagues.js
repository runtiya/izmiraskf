const express = require('express');
const multer = require('multer');

const leaguesController = require('../../controllers/application/leagues');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:seasonid", leaguesController.getLeagues);



module.exports = router;
