const express = require('express');
const multer = require('multer');

const staffitffController = require('../../controllers/admin/staffitff');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, staffitffController.getStaffList);

router.post("", checkAuth, staffitffController.createStaff);

router.put("/:id", checkAuth, staffitffController.updateStaff);

router.delete("/:id", checkAuth, staffitffController.deleteStaff)

module.exports = router;
