const express = require('express');
const multer = require('multer');

const staffitffController = require('../../controllers/admin/staffitff');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("", staffitffController.getStaffList);

router.post("", staffitffController.createStaff);

router.put("/:id", staffitffController.updateStaff);

router.delete("/:id", staffitffController.deleteStaff)

module.exports = router;
