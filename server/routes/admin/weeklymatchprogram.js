const express = require('express');

const weeklymatchprogramController = require('../../controllers/admin/weeklymatchprogram');

const checkAuth = require('../../middlewares/check-auth');

const router = express.Router();


router.get("/:seasonid", checkAuth, weeklymatchprogramController.getWeeklyMatchProgram);

router.post("", checkAuth, weeklymatchprogramController.createWeeklyMatchProgram);

router.put("/:seasonid/:id", checkAuth, weeklymatchprogramController.updateWeeklyMatchProgram);

router.delete("/:seasonid/:id", checkAuth, weeklymatchprogramController.deleteWeeklyMatchProgram);


module.exports = router;
