const { Settings } = require('@mui/icons-material');
const mongoose = require('mongoose');

const userDashboardSchema = new mongoose.Schema(
  {
    userId:{
      type: String,
      required: true,
    },

    layoutConfig:{
      type: Object,
      required:true,
    },
    widgets:[
      {
        widgetId:String,
        type:String,
        position:Object,
        Settings:Object,
      }
    ],
  },{timestamps:true}
);

const UserDashBoard = mongoose.model('UserDashboard',userDashboardSchema);

module.exports = UserDashBoard;