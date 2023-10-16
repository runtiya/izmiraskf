const express = require('express');

const teamsingroupstagesController = require('../../controllers/application/teamsingroupstages');

const router = express.Router();


router.get("/:groupstageId", teamsingroupstagesController.getTeamsInGroupstages);

router.get("", teamsingroupstagesController.getTeamsForGroupstages);



module.exports = router;
