const express = require('express');
const multer = require('multer');

const disciplinaryBoardDecisionController = require('../../controllers/application/disciplinaryboarddecisions');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:fileid", disciplinaryBoardDecisionController.getDisciplinaryBoardDecisions);


module.exports = router;
