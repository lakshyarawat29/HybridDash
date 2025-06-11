const UserDashBoard = require('../models/nosqlModels/userDashboard.model');

async function saveDashBoard(userId, config) {
  try {
    let dashboard = await UserDashBoard.findOne({ userId });

    if (dashboard) {
      dashboard.config = config;
      await dashboard.save();
    } else {
      dashboard = new UserBoard({
        userId,
        config,
      });

      await dashboard.save();
    }

    return dashboard;
  } catch (err) {
    console.Error(`Error Saving the DashBoard:${err.message}`);
  }
}

async function getDashBoard(userId) {
  try {
    const dashboard = await UserBoard.findOne({ userId });
    if (!dashboard) {
      throw new Error('Dashboard not found');
    }

    return dashboard;
  } catch (err) {
    throw new Error(`Error fetching dashboard: ${err.message}`);
  }
}

module.exports = {
  saveDashBoard,
  getDashBoard,
};
