const express = require('express');
const multer = require('multer');

const disciplinaryBoardFileController = require('../../controllers/admin/disciplinaryboardfiles');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:seasonid", checkAuth, disciplinaryBoardFileController.getDisciplinaryBoardFiles);

router.post("", checkAuth, disciplinaryBoardFileController.createDisciplinaryBoardFile);

router.put("/:id", checkAuth, disciplinaryBoardFileController.updateDisciplinaryBoardFile);

router.delete("/:id", checkAuth, disciplinaryBoardFileController.deleteDisciplinaryBoardFile);


module.exports = router;
