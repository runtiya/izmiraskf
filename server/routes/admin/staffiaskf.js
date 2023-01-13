const express = require('express');
const multer = require('multer');

const staffiaskfController = require('../../controllers/admin/staffiaskf');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("", staffiaskfController.getStaffList);

router.post("", staffiaskfController.createStaff);

router.put("/:id", staffiaskfController.updateStaff);

router.delete("/:id", staffiaskfController.deleteStaff)

module.exports = router;
