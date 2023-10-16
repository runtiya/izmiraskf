const express = require('express');

const staffizmiraskfController = require('../../controllers/application/staffizmiraskf');

const router = express.Router();


router.get("", staffizmiraskfController.getStaffList);

module.exports = router;
