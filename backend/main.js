require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5050;

if (process.env.NODE_ENV !== 'production') {
  app.set('json spaces', 2);
}

app.use(cors());
app.use(express.json());

// Mount all API routes
app.use('/', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error occurred' });
});

// Start the server
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // IMPORTANT: Sync models first to create tables if they don't exist
    // Only use { alter: true } in development! In production → use migrations
    await sequelize.sync({ alter: true });
    console.log('Tables synced / checked');

    // Now it's safe to seed roles because tables already exist
    const { Role } = require('./models');
    const roles = ['Admin', 'Seller', 'Pelanggan'];

    for (const name of roles) {
      const [role, created] = await Role.findOrCreate({
        where: { name },
        defaults: { name }  
      });

      if (created) {
        console.log(`Role "${name}" created`);
      } else {
        console.log(`Role "${name}" already exists`);
      }
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);  // optional: exit jika gagal start
  }
}

start();