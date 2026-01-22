const { User, Role, sequelize } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        [sequelize.col('Role.name'), 'role'], 
        'created_at',
        'updated_at'
      ],
      include: [{
        model: Role,
        attributes: [], 
      }],
      raw: true, 
    });

    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['Admin', 'Seller', 'Pelanggan'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role harus salah satu dari: Admin, Seller, Pelanggan'
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    const roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) {
      return res.status(500).json({ success: false, message: 'Role tidak ditemukan di database' });
    }

    user.role_id = roleRecord.id;
    await user.save();

    res.json({
      success: true,
      message: 'Role user berhasil diubah',
      data: { id: user.id, name: user.name, email: user.email, role }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};