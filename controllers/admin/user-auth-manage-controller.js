const userAuthManageModel = require('../../models/admin/user-auth-manage-model');

exports.createPermission = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  const { userid, menucd, menunm, menuaccess } = req.body;

  try {
    await userAuthManageModel.createPermission(userid, menucd, menunm, menuaccess);
    res.status(201).json({ message: 'Permission created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listPermissions = async (req, res) => {
  const { userid, menucd, menunm } = req.body; // req.query → req.body

  try {
    const permissions = await userAuthManageModel.listPermissions({ userid, menucd, menunm });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 권한 업데이트
exports.updatePermission = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  const { id } = req.params;
  const { menucd, menunm, menuaccess } = req.body;

  try {
    const updated = await userAuthManageModel.updatePermission(id, menucd, menunm, menuaccess);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Permission not found or no changes applied' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Permission updated successfully', 
      data: { id, menucd, menunm, menuaccess } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update permission', error: error.message });
  }
};

// 권한 삭제
exports.deletePermission = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin only' });
  }
  const { id } = req.params;

  try {
    const deleted = await userAuthManageModel.deletePermission(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Permission not found' });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Permission deleted successfully', 
      data: { id } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete permission', error: error.message });
  }
};