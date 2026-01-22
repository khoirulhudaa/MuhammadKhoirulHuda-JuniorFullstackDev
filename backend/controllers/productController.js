const { Product } = require('../models');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, stock, price } = req.body;

    if (!name || stock == null || price == null) {
      return res.status(400).json({ success: false, message: 'name, stock, price wajib diisi' });
    }

    const product = await Product.create({ name, stock, price });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'quantity harus lebih dari 0' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Stok tidak cukup. Tersedia: ${product.stock}, diminta: ${quantity}`
      });
    }

    product.stock -= quantity;
    await product.save();

    res.json({
      success: true,
      message: `Penjualan berhasil. Stok tersisa: ${product.stock}`,
      data: product
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};