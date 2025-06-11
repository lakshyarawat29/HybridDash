const ActivityLog = require('../models/nosqlModels/activityLog.model');

//  * Logs a new user activity
//  * @param {string} userId - User's ID (SQL UUID or Mongo ObjectId)
//  * @param {string} action - The action performed (e.g. "LOGIN", "DASHBOARD_UPDATED")
//  * @param {object} details - Optional additional details

async function logActivity(userId,action,details = {}){
  try{
    const log = new ActivityLog({
      userId,
      action,
      details,
    });
    await log.save();
    return log;
  }catch(err){
    throw new Error(`Error logging activity: ${err.message}`);
  }
}

// /**
//  * Fetches all activity logs for a given user
//  * @param {string} userId - User's ID
//  * @returns {Array} List of activity logs
//  */


async function getActivityLogByUser (userId){
  try{
    const logs = await ActivityLog.find({userId}).sort({createdAt: -1});
    return logs;
  }catch(err){
    throw new Error(`Error fetching activity logs: ${err.message}`);
  }
}

module.exports = {
  logActivity,getActivityLogByUser
}