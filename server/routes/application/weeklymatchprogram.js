const express = require('express');

const weeklymatchprogramController = require('../../controllers/application/weeklymatchprogram');

const router = express.Router();


router.get("/:seasonid", weeklymatchprogramController.getWeeklyMatchProgram);

module.exports = router;
