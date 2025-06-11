const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  userId:String,
  action:String,
  details:Object,
  timestamp:{type:Date, default:Date.now},
});

module.exports = mongoose.model('ActivityLog',ActivityLogSchema);