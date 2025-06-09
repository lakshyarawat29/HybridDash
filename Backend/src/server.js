const sequelize = require('./config/db.sql'); // Your Sequelize instance
const { User, Connection, Dashboard, Template } = require('./models'); // Import models

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL (Docker) connected!');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced with DB');
  } catch (err) {
    console.error('❌ DB connection or sync error:', err);
    process.exit(1);
  }
})();
