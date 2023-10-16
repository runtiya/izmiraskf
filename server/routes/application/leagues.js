const express = require('express');

const leaguesController = require('../../controllers/application/leagues');

const router = express.Router();


router.get("/:seasonid", leaguesController.getLeagues);



module.exports = router;
