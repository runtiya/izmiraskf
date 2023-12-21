const express = require('express');

const aboutizmiraskfController = require('../../controllers/admin/aboutizmiraskf');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');
const cache = require('../../middlewares/request-cache');
const router = express.Router();


router.get("", checkAuth, cache(10),  aboutizmiraskfController.getAboutContent);

router.put("", checkAuth, extractImage, setTimestamp, aboutizmiraskfController.updateAboutContent);

module.exports = router;
