const express = require('express');
const multer = require('multer');

const documentsController = require('../../controllers/admin/documents');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:type", documentsController.getDocuments);

router.post("", documentsController.createDocument);

router.put("/:id", documentsController.updateDocument);

router.delete("/:id", documentsController.deleteDocument)


module.exports = router;
