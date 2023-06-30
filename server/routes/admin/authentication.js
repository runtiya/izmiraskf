const express = require('express');

const checkAuth = require('../../middlewares/check-auth');
const authenticationController = require('../../controllers/admin/authentication');

const router = express.Router();

router.get('', checkAuth, authenticationController.getUsers);

router.post('/signup', authenticationController.createUser);

router.post('/login', authenticationController.userLogin);

router.put('/profileupdate/:id', checkAuth, authenticationController.updateUser);

router.delete('/:id', checkAuth, authenticationController.deleteUser);

module.exports = router;
