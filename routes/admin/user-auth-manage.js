const express = require('express');
const router = express.Router();
const userAuthManageController = require('../../controllers/admin/user-auth-manage-controller');
const { authMiddleware } = require('../../utils/jwt-token');

router.post('/create', authMiddleware, userAuthManageController.createPermission);
router.post('/list', authMiddleware, userAuthManageController.listPermissions); // GET → POST
// router.post('/update/:id', authMiddleware, userAuthManageController.updatePermission); // PUT → POST
router.post('/update/:id', authMiddleware, (req, res) => {
  console.log('Reached /update/:id with ID:', req.params.id); // 경로 도달 확인
  userAuthManageController.updatePermission(req, res);
});

router.post('/delete/:id', authMiddleware, userAuthManageController.deletePermission); // DELETE → POST

module.exports = router;