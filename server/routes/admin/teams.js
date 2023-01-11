const express = require('express');
const multer = require('multer');

const teamsController = require('../../controllers/admin/teams');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();





router.get("", teamsController.getTeams);

router.get("/:id", teamsController.findTeam);

router.post("", teamsController.createTeam);

router.put("/:id", teamsController.updateTeam);

router.delete("/:id", teamsController.deleteTeam);


module.exports = router;
