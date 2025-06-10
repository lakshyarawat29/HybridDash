const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {
  validateRegister,
  validateLogin,
} = require('../middlewares/validators');
const auth = require('../middlewares/auth.middleware');

router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

module.exports = router;
