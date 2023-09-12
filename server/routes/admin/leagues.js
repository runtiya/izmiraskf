const express = require('express');
const multer = require('multer');

const leaguesController = require('../../controllers/admin/leagues');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const exceptionHandling = require('../../middlewares/exception-handling');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("/:seasonid", checkAuth, leaguesController.getLeagues, exceptionHandling);

router.post("", checkAuth, setTimestamp, leaguesController.createLeague);

router.put("/:id", checkAuth, setTimestamp, leaguesController.updateLeague);

router.delete("/:id", checkAuth, leaguesController.deleteLeague);


module.exports = router;
