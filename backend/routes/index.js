  const express = require('express');
  const router = express.Router();

  // Import semua route handlers
  const authRouter = require('./auth');
  const productRouter = require('./product');
  const userRouter = require('./user');

  router.use('/auth', authRouter);
  router.use('/product', productRouter);
  router.use('/user', userRouter);

  // Route testing
  router.get('/test', (req, res) => {
    res.json({
      success: true,
      message: 'API OK (1.0.0)',
      timestamp: new Date().toISOString()
    });
  });

  module.exports = router;