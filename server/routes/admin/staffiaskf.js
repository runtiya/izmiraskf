const express = require('express');
const multer = require('multer');

const staffiaskfController = require('../../controllers/admin/staffiaskf');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, staffiaskfController.getStaffList);

router.post("", checkAuth, staffiaskfController.createStaff);

router.put("/:id", checkAuth, staffiaskfController.updateStaff);

router.delete("/:id", checkAuth, staffiaskfController.deleteStaff)

module.exports = router;
