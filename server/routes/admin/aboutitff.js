const express = require('express');
const multer = require('multer');

const aboutitffController = require('../../controllers/admin/aboutitff');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();

// Get function for About Text and Staff List together
router.get("", aboutitffController.getAboutContent);

// Create function for a new Staff only
router.post("", aboutitffController.createAboutContent);

// Update function for About Text only - without url param
router.put("", aboutitffController.updateAboutContent);

// Update function for Staff only - with url param
router.put("/:id", aboutitffController.updateAboutContentForStaff);

// Delete function for Staff only - with url param
router.delete("/:id", aboutitffController.deleteAboutContentForStaff)

/*
No delete function for About Text. It can be only updated ann/or got with a request without params.
There are two update functions, with an "id" param and without param, that are seperated for About Text and Staff List.
*/

module.exports = router;
