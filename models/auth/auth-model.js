const authSql = require('../../sqls/auth/auth-sql');
const { execSql } = require('../../utils/sql-exec');

const authModel = {
    // 사용자 로그인 정보 조회
    getUserByCredentials: async (userid, password) => {
      const loginQuery = authSql.getLoginQuery();
      if (!loginQuery || typeof loginQuery.query !== 'string') {
        throw new Error('Invalid login query object');
      }
      const rows = await execSql(loginQuery, [userid, password]);
      return rows.length > 0 ? rows[0] : null;
    },
  
    // 사용자 정보 조회 (JWT 기반)
    getUserById: async (userid) => {
      const userCheckQuery = authSql.getUserCheckQuery();
      if (!userCheckQuery || typeof userCheckQuery.query !== 'string') {
        throw new Error('Invalid user check query object');
      }
      const rows = await execSql(userCheckQuery, [userid]);
      return rows.length > 0 ? rows[0] : null;
    }
  };


module.exports = authModel;