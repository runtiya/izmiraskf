const express = require('express');

const teamsController = require('../../controllers/admin/teams');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("", checkAuth, teamsController.getTeams);

router.get("/:id", checkAuth, teamsController.findTeam);

router.post("", checkAuth, extractImage, setTimestamp, teamsController.createTeam);

router.put("/:id", checkAuth, extractImage, setTimestamp, teamsController.updateTeam);

router.delete("/:id", checkAuth, teamsController.deleteTeam);


module.exports = router;
