const express = require('express');
const multer = require('multer');

const disciplinaryBoardDecisionController = require('../../controllers/admin/disciplinaryboarddecisions');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:fileid", disciplinaryBoardDecisionController.getDisciplinaryBoardDecisions);

router.post("", disciplinaryBoardDecisionController.createDisciplinaryBoardDecision);

router.put("/:id", disciplinaryBoardDecisionController.updateDisciplinaryBoardDecision);

router.delete("/:id", disciplinaryBoardDecisionController.deleteDisciplinaryBoardDecision);

router.delete("/temizle/:fileid", disciplinaryBoardDecisionController.clearDisciplinaryBoardDecisions);


module.exports = router;
