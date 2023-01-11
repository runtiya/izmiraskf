const express = require('express');
const multer = require('multer');

const aboutiaskfController = require('../../controllers/admin/aboutiaskf');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();

// Get function for About Text and Staff List together
router.get("", aboutiaskfController.getAboutContent);

// Create function for a new Staff only
router.post("", aboutiaskfController.createAboutContent);

// Update function for About Text only - without url param
router.put("", aboutiaskfController.updateAboutContent);

// Update function for Staff only - with url param
router.put("/:id", aboutiaskfController.updateAboutContentForStaff);

// Delete function for Staff only - with url param
router.delete("/:id", aboutiaskfController.deleteAboutContentForStaff)

/*
No delete function for About Text. It can be only updated ann/or got with a request without params.
There are two update functions, with an "id" param and without param, that are seperated for About Text and Staff List.
*/

module.exports = router;
