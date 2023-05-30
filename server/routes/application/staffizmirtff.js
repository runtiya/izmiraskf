const express = require('express');
const multer = require('multer');

const staffizmirtffController = require('../../controllers/application/staffizmirtff');


const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", staffizmirtffController.getStaffList);


module.exports = router;
