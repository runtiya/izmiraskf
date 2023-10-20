const express = require('express');

const leaguesController = require('../../controllers/admin/leagues');

const checkAuth = require('../../middlewares/check-auth');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("/:seasonid", checkAuth, leaguesController.getLeagues);

router.post("", checkAuth, setTimestamp, leaguesController.createLeague);

router.put("/:id", checkAuth, setTimestamp, leaguesController.updateLeague);

router.delete("/:id", checkAuth, leaguesController.deleteLeague);


module.exports = router;
