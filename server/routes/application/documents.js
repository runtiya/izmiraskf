const express = require('express');

const documentsController = require('../../controllers/application/documents');

const router = express.Router();

router.get("/:filecategory", documentsController.getDocuments);

module.exports = router;
