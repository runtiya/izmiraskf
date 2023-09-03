const express = require('express');

const teamsController = require('../../controllers/admin/teams');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const requestCache = require('../../middlewares/request-cache');

const router = express.Router();


router.get("", checkAuth, requestCache(3000), teamsController.getTeams);

router.get("/:id", checkAuth, teamsController.findTeam);

router.post("", checkAuth, extractImage, teamsController.createTeam);

router.put("/:id", checkAuth, extractImage, teamsController.updateTeam);

router.delete("/:id", checkAuth, teamsController.deleteTeam);


module.exports = router;
