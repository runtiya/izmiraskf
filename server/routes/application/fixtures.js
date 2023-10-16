const express = require('express');

const fixturesController = require('../../controllers/application/fixtures');

const router = express.Router();


router.put("/search", fixturesController.getFixtureBySearchIndex);


module.exports = router;
