const express = require('express');

const stadiumsController = require('../../controllers/application/stadiums');

const router = express.Router();

router.get("", stadiumsController.getStadiums);

router.get("/:id", stadiumsController.getStadiumById);



module.exports = router;
