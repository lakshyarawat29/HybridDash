const activityLog = require('../services/activityLog.service');

async function logActivityController(req,res){
  try{
    const {userId,action,details} = req.body;
    const log = await activityLog.logActivity(userId,action,details);
    res.status(201).json(log);
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

async function getActivityLogByUserController(req,res){
  try{
    const {userId} = req.params;
    const logs = await activityLog.getActivityLogByUser(userId);
    res.status(200).json(logs);
  }catch(err){
    res.status(500).json({error:err.message});
  }
}

module.exports = {
  logActivityController,getActivityLogByUserController
}