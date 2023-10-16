const express = require('express');

const teamsController = require('../../controllers/application/teams');

const router = express.Router();


router.get("", teamsController.getTeams);

router.get("/:id", teamsController.getTeamById);

module.exports = router;
