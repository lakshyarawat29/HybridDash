const { sequelize, User, Template, Dashboard, Connection } = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    console.log('🌱 Starting DB seed...');
    await sequelize.sync({ force: true }); // Reset DB (⚠️ WARNING: deletes all data)

    // Hash a sample password
    const passwordHash = await bcrypt.hash('password123', 10);

    // Create Users
    const user = await User.create({
      name: 'Lakshya',
      email: 'lakshya@example.com',
      passwordHash,
      role: 'admin',
    });

    // Create Templates
    const templates = await Template.bulkCreate([
      {
        name: 'E-Commerce Dashboard',
        description: 'Tracks orders, revenue, and customer activity.',
        config: {
          widgets: ['sales_chart', 'top_products', 'active_users'],
        },
      },
      {
        name: 'IoT Device Dashboard',
        description: 'Monitors device status and real-time metrics.',
        config: {
          widgets: ['device_status', 'temperature', 'alerts'],
        },
      },
    ]);

    // Create a dashboard for the user
    await Dashboard.create({
      name: 'My Sales Dashboard',
      config: {
        widgets: ['sales_chart', 'orders_table'],
      },
      userId: user.id,
    });

    // Example DB connection (dummy config)
    await Connection.create({
      type: 'sql',
      dbType: 'mysql',
      config: {
        host: 'localhost',
        user: 'demo',
        pass: 'demo123',
        dbName: 'example_db',
      },
      name: 'My Local MySQL',
      userId: user.id,
    });

    console.log('✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
