const express = require('express');
const multer = require('multer');

const staffizmiraskfController = require('../../controllers/application/staffizmiraskf');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", staffizmiraskfController.getStaffList);

module.exports = router;
