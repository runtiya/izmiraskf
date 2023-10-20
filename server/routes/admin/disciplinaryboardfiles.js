const express = require('express');

const disciplinaryBoardFileController = require('../../controllers/admin/disciplinaryboardfiles');

const checkAuth = require('../../middlewares/check-auth');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("/:seasonid/:casetype", checkAuth, disciplinaryBoardFileController.getDisciplinaryBoardFiles);

router.post("", checkAuth, setTimestamp, disciplinaryBoardFileController.createDisciplinaryBoardFile);

router.put("/:id", checkAuth, setTimestamp, disciplinaryBoardFileController.updateDisciplinaryBoardFile);

router.delete("/:id", checkAuth, disciplinaryBoardFileController.deleteDisciplinaryBoardFile);


module.exports = router;
