const express = require('express');

const staffizmirtffController = require('../../controllers/application/staffizmirtff');

const router = express.Router();


router.get("", staffizmirtffController.getStaffList);


module.exports = router;
