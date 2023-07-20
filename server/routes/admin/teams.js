const express = require('express');

const teamsController = require('../../controllers/admin/teams');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimeStamp = require('../../middlewares/set-timestamp');

const router = express.Router();


router.get("", checkAuth, teamsController.getTeams);

router.get("/:id", checkAuth, teamsController.findTeam);

router.post("", checkAuth, extractImage, teamsController.createTeam);

router.put("/:id", checkAuth, extractImage, setTimeStamp, teamsController.updateTeam);

router.delete("/:id", checkAuth, teamsController.deleteTeam);


module.exports = router;
