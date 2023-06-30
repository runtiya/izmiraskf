const express = require('express');
const multer = require('multer');

const staffizmirtffController = require('../../controllers/admin/staffizmirtff');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", checkAuth, staffizmirtffController.getStaffList);

router.post("", checkAuth, extractImage, staffizmirtffController.createStaff);

router.put("/:id", checkAuth, extractImage, staffizmirtffController.updateStaff);

router.delete("/:id", checkAuth, staffizmirtffController.deleteStaff)

module.exports = router;
