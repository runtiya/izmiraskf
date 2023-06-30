const express = require('express');
const multer = require('multer');

const leaguesController = require('../../controllers/application/leagues');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/:seasonid", leaguesController.getLeagues);



module.exports = router;
