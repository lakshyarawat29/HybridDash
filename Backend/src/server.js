const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoConnection = require('../src/config/db.mongo');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const sequelize = require('./config/db.sql');
require('../src/models/sqlModels/user.model'); 
require('../src/models/nosqlModels/userDashboard.model'); 
require('../src/models/nosqlModels/activityLog.model');    

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL (Docker) connected!');
    await sequelize.sync({ alter: true });
    console.log('Models synced with DB');
  } catch (err) {
    console.error('DB connection or sync error:', err);
    process.exit(1);
  }
})();

mongoConnection();

// API routes
const userRoutes = require('../src/routes/user.routes');
const activityLogRoutes = require('../src/routes/activityLog.routes');
const userDashboardRoutes = require('../src/routes/userdashboard.routes');

app.use('/api/users', userRoutes);
app.use('/api', activityLogRoutes);
app.use('/api', userDashboardRoutes);

app.get('/', (req, res) => {
  res.send('HybridDash API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
