const express = require('express');
const multer = require('multer');

const documentsController = require('../../controllers/admin/documents');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:type", checkAuth, documentsController.getDocuments);

router.post("", checkAuth, documentsController.createDocument);

router.put("/:id", checkAuth, documentsController.updateDocument);

router.delete("/:id", checkAuth, documentsController.deleteDocument)


module.exports = router;
