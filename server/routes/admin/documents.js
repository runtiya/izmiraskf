const express = require('express');
const multer = require('multer');

const documentsController = require('../../controllers/admin/documents');

const checkAuth = require('../../middlewares/check-auth');
const extractFile = require('../../middlewares/extract-file');

const router = express.Router();


router.get("/:filecategory", checkAuth, documentsController.getDocuments);

router.post("/:filecategory", checkAuth, extractFile, documentsController.createDocument);

router.put("/:filecategory/:id", checkAuth, extractFile, documentsController.updateDocument);

router.delete("/:id", checkAuth, documentsController.deleteDocument)


module.exports = router;
