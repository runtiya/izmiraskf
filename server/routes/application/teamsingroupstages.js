const express = require('express');
const multer = require('multer');

const teamsingroupstagesController = require('../../controllers/application/teamsingroupstages');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:groupstageId", teamsingroupstagesController.getTeamsInGroupstages);

router.get("", teamsingroupstagesController.getTeamsForGroupstages);



module.exports = router;
