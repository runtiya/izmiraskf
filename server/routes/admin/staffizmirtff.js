const express = require('express');
const multer = require('multer');

const staffizmirtffController = require('../../controllers/admin/staffizmirtff');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');
const router = express.Router();


router.get("", checkAuth, staffizmirtffController.getStaffList);

router.post("", checkAuth, extractImage, setTimestamp, staffizmirtffController.createStaff);

router.put("/:id", checkAuth, extractImage, setTimestamp, staffizmirtffController.updateStaff);

router.delete("/:id", checkAuth, staffizmirtffController.deleteStaff)

module.exports = router;
