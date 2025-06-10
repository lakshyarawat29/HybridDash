const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Load DB + Models
const sequelize = require('./config/db.sql');
require('./models'); // Ensures models are registered

// Optional: sync DB on startup (or move this to a separate script)
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

// API routes
const userRoutes = require('../src/routes/user.routes');
app.use('/api/users', userRoutes);
// Health check
app.get('/', (req, res) => {
  res.send('HybridDash API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
