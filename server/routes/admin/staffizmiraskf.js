const express = require('express');
const multer = require('multer');

const staffizmiraskfController = require('../../controllers/admin/staffizmiraskf');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, staffizmiraskfController.getStaffList);

router.post("", checkAuth, staffizmiraskfController.createStaff);

router.put("/:id", checkAuth, staffizmiraskfController.updateStaff);

router.delete("/:id", checkAuth, staffizmiraskfController.deleteStaff)

module.exports = router;
