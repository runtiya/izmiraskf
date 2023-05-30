const express = require('express');
const multer = require('multer');

const staffizmirtffController = require('../../controllers/admin/staffizmirtff');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, staffizmirtffController.getStaffList);

router.post("", checkAuth, staffizmirtffController.createStaff);

router.put("/:id", checkAuth, staffizmirtffController.updateStaff);

router.delete("/:id", checkAuth, staffizmirtffController.deleteStaff)

module.exports = router;
