const userDashboardService = require('../services/userDashboard.service');

async function saveDashboardController(req, res) {
  try {
    const { userId, config } = req.body;
    const dashboard = await userDashboardService.saveDashboard(userId, config);
    res.status(201).json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getDashboardController(req, res) {
  try {
    const { userId } = req.params;
    const dashboard = await userDashboardService.getDashboard(userId);
    res.status(200).json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  saveDashboardController,
  getDashboardController,
};
