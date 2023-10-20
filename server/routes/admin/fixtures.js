const express = require('express');

const fixturesController = require('../../controllers/admin/fixtures');

const checkAuth = require('../../middlewares/check-auth');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.put("/search", checkAuth, fixturesController.getFixtureBySearchIndex);

router.post("/create", checkAuth, setTimestamp, fixturesController.createFixture);

router.put("/update", checkAuth, setTimestamp, fixturesController.updateFixture);

router.delete("/delete/:id", checkAuth, fixturesController.deleteMatch);

router.delete("/clear/:groupstageid", checkAuth, fixturesController.clearFixture)

module.exports = router;
