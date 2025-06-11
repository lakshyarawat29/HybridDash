const express = require('express');
const router = express.Router();
const {
  saveDashboardController,
  getDashboardController,
} = require('../controllers/userdashBoard.controller');

router.post('/user-dashboard', saveDashboardController);
router.get('/user-dashboard/:userId', getDashboardController);

module.exports = router;
