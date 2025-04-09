const express = require('express');
const { authMiddleware } = require('../../utils/jwt-token');
const authController = require('../../controllers/auth/auth-controller');
const router = express.Router();

// 로그인
router.post('/login', authController.login);

// 사용자 정보 조회 (JWT 인증)
router.post('/me', authMiddleware, authController.getMe);

module.exports = router;