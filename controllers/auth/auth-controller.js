const { jwtSign } = require('../../utils/jwt-token');
const { clientIp } = require('../../utils/common');
const authModel = require('../../models/auth/auth-model');

const authController = {
  // 로그인 처리
  login: async (req, res) => {
    const { userid, password } = req.body;

    try {
      const user = await authModel.getUserByCredentials(userid, password);

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = jwtSign({ userid: user.userid, role: user.role });
      const userInfo = {
        userid: user.userid,
        username: user.usernm,
        role: user.role,
        ip: clientIp(req)
      };

      res.json({ success: true, token, user: userInfo });
    } catch (error) {
      console.log('Login error:', error.message);
      res.status(500).json({ success: false, message: 'Login failed', error: error.message });
    }
  },

  // 사용자 정보 조회
  getMe: async (req, res) => {
    try {
      const user = await authModel.getUserById(req.user.userid);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const userInfo = { userid: user.userid, username: user.usernm, role: user.role, ip: clientIp(req) };
      res.json({ success: true, user: userInfo });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve user info', error: error.message });
    }
  }
};

module.exports = authController;