const express = require('express');
const router = express.Router();
const {
  logActivityController,
  getActivityLogByUserController,
} = require('../controllers/activityLog.controller');

router.post('/logs', logActivityController);
router.get('/logs/:userId', getActivityLogByUserController);


module.exports = router;
