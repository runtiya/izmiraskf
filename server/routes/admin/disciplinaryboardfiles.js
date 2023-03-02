const express = require('express');
const multer = require('multer');

const disciplinaryBoardFileController = require('../../controllers/admin/disciplinaryboardfiles');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:seasonid", disciplinaryBoardFileController.getDisciplinaryBoardFiles);

router.post("", disciplinaryBoardFileController.createDisciplinaryBoardFile);

router.put("/:id", disciplinaryBoardFileController.updateDisciplinaryBoardFile);

router.delete("/:id", disciplinaryBoardFileController.deleteDisciplinaryBoardFile);


module.exports = router;
