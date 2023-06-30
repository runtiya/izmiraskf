const express = require('express');
const multer = require('multer');

const staffizmirtffController = require('../../controllers/application/staffizmirtff');


const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", staffizmirtffController.getStaffList);


module.exports = router;
