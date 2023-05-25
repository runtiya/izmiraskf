const express = require('express');
const multer = require('multer');

const stadiumsController = require('../../controllers/admin/stadiums');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();





router.get("", checkAuth, stadiumsController.getStadiums);

router.get("/:id", checkAuth, stadiumsController.findStadium);

router.post("", checkAuth, stadiumsController.createStadium);

router.put("/:id", checkAuth, stadiumsController.updateStadium);

router.delete("/:id", checkAuth, stadiumsController.deleteStadium);


module.exports = router;
