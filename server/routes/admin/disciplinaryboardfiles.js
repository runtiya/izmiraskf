const express = require('express');
const multer = require('multer');

const disciplinaryBoardFileController = require('../../controllers/admin/disciplinaryboardfiles');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("/:seasonid/:casetype", checkAuth, disciplinaryBoardFileController.getDisciplinaryBoardFiles);

router.post("", checkAuth, setTimestamp, disciplinaryBoardFileController.createDisciplinaryBoardFile);

router.put("/:id", checkAuth, setTimestamp, disciplinaryBoardFileController.updateDisciplinaryBoardFile);

router.delete("/:id", checkAuth, disciplinaryBoardFileController.deleteDisciplinaryBoardFile);


module.exports = router;
