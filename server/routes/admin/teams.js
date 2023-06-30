const express = require('express');
const fs = require('fs');

const teamsController = require('../../controllers/admin/teams');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};




router.get("", checkAuth, teamsController.getTeams);

router.get("/:id", checkAuth, teamsController.findTeam);

router.post("", checkAuth, extractImage, teamsController.createTeam);

router.put("/:id", checkAuth, extractImage, teamsController.updateTeam);

router.delete("/:id", checkAuth, teamsController.deleteTeam);


module.exports = router;
