const express = require('express');
const multer = require('multer');

const stadiumsController = require('../../controllers/application/stadiums');


const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();



router.get("", stadiumsController.getStadiums);

router.get("/:id", stadiumsController.getStadiumById);



module.exports = router;
