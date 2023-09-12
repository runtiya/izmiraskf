const express = require('express');
const multer = require('multer');

const staffizmiraskfController = require('../../controllers/admin/staffizmiraskf');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("", checkAuth, staffizmiraskfController.getStaffList);

router.post("", checkAuth, extractImage, setTimestamp, staffizmiraskfController.createStaff);

router.put("/:id", checkAuth, extractImage, setTimestamp, staffizmiraskfController.updateStaff);

router.delete("/:id", checkAuth, staffizmiraskfController.deleteStaff)

module.exports = router;
