const express = require('express');
const fs = require('fs');

const teamsController = require('../../controllers/application/teams');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

router.get("", teamsController.getTeams);

router.get("/:id", teamsController.getTeamById);

module.exports = router;
